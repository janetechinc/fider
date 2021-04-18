import React from "react"
import { Post, PostStatus } from "@fider/models"
import { actions } from "@fider/services"
import { DropDown, DropDownItem, Icon } from "@fider/components"
import FaCaretUp from "@fider/assets/images/fa-caretup.svg"
import { HStack } from "@fider/components/layout"

interface PostSearchProps {
  exclude?: number[]
  onChanged(postNumber: number): void
}

interface PostSearchState {
  posts: Post[]
}

export class PostSearch extends React.Component<PostSearchProps, PostSearchState> {
  private timer?: number

  constructor(props: PostSearchProps) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  public componentDidMount() {
    this.search("")
  }

  private onSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.search(e.currentTarget.value)
  }

  private onChange = (item: DropDownItem) => {
    this.props.onChanged(item.value as number)
  }

  private search = (searchQuery: string) => {
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      actions.searchPosts({ query: searchQuery }).then((res) => {
        if (res.ok) {
          const posts =
            this.props.exclude && this.props.exclude.length > 0
              ? res.data.filter((i) => this.props.exclude && this.props.exclude.indexOf(i.number) === -1)
              : res.data
          this.setState({ posts })
        }
      })
    }, 500)
  }

  public render() {
    const items = this.state.posts.map((p) => {
      const status = PostStatus.Get(p.status)
      return {
        label: p.title,
        value: p.number,
        render: (
          <>
            <HStack className="votes">
              <Icon sprite={FaCaretUp} className="h-4 mr-1" />
              {p.votesCount}
            </HStack>
            <span className={`status-label status-${status.value}`}>{status.title}</span>
            {p.title}
          </>
        ),
      }
    })

    return (
      <DropDown
        className="c-post-search"
        searchable={true}
        items={items}
        placeholder="Search original post"
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
      />
    )
  }
}
