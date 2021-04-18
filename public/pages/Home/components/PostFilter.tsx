import React, { useState } from "react"
import { PostStatus } from "@fider/models"
import { Dropdown2 } from "@fider/components"
import { HStack } from "@fider/components/layout"
import { useFider } from "@fider/hooks"

interface PostFilterProps {
  activeView: string
  countPerStatus: { [key: string]: number }
  viewChanged: (name: string) => void
}

interface OptionItem {
  value: string
  label: string
  count?: number
}

export const PostFilter = (props: PostFilterProps) => {
  const fider = useFider()
  const [view, setView] = useState<string>(props.activeView)

  const handleChangeView = (item: OptionItem) => () => {
    setView(item.value)
    props.viewChanged(item.value)
  }

  const options: OptionItem[] = [
    { value: "trending", label: "Trending" },
    { value: "recent", label: "Recent" },
    { value: "most-wanted", label: "Most Wanted" },
    { value: "most-discussed", label: "Most Discussed" },
  ]

  if (fider.session.isAuthenticated) {
    options.push({ value: "my-votes", label: "My Votes" })
  }

  PostStatus.All.filter((s) => s.filterable && props.countPerStatus[s.value]).forEach((s) => {
    options.push({
      label: s.title,
      value: s.value,
      count: props.countPerStatus[s.value],
    })
  })

  const selectedItem = options.filter((x) => x.value === view)
  const label = selectedItem.length > 0 ? selectedItem[0].label : options[0].label

  return (
    <HStack>
      <span className="text-category">View</span>
      <Dropdown2 renderHandle={<div className="text-medium text-xs uppercase rounded-md uppercase bg-gray-100 px-2 py-1">{label}</div>}>
        {options.map((o) => (
          <Dropdown2.ListItem onClick={handleChangeView(o)} key={o.value}>
            <HStack spacing={2}>
              <span className={view === o.value ? "text-semibold" : ""}>{o.label}</span>
              {o.count && o.count > 0 && <span className="bg-gray-200 rounded-full p-1 w-min-5 text-2xs text-center">{o.count}</span>}
            </HStack>
          </Dropdown2.ListItem>
        ))}
      </Dropdown2>
    </HStack>
  )
}

// export const PostFilter = (props: PostFilterProps) => {
//   const fider = useFider()

//   const handleChangeView = (item: DropDownItem) => {
//     props.viewChanged(item.value as string)
//   }

//   const options: DropDownItem[] = [
//     { value: "trending", label: "Trending" },
//     { value: "recent", label: "Recent" },
//     { value: "most-wanted", label: "Most Wanted" },
//     { value: "most-discussed", label: "Most Discussed" },
//   ]

//   if (fider.session.isAuthenticated) {
//     options.push({ value: "my-votes", label: "My Votes" })
//   }

//   PostStatus.All.filter((s) => s.filterable && props.countPerStatus[s.value]).forEach((s) => {
//     options.push({
//       label: s.title,
//       value: s.value,
//       render: (
//         <span>
//           {s.title} <a className="counter">{props.countPerStatus[s.value]}</a>
//         </span>
//       ),
//     })
//   })

//   const viewExists = options.filter((x) => x.value === props.activeView).length > 0
//   const activeView = viewExists ? props.activeView : "trending"

//   return (
//     <div>
//       <span className="text-category">View</span>
//       <DropDown
//         header="What do you want to see?"
//         className="l-post-filter"
//         inline={true}
//         style="simple"
//         items={options}
//         defaultValue={activeView}
//         onChange={handleChangeView}
//       />
//     </div>
//   )
// }
