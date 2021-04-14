import "./UIToolkit.page.scss"

import React, { useState } from "react"
import { PostStatus, UserStatus } from "@fider/models"
import {
  PageTitle,
  Button,
  List,
  UserName,
  ListItem,
  Toggle,
  Avatar,
  ShowTag,
  Segment,
  Segments,
  ShowPostStatus,
  Moment,
  Loader,
  Form,
  Input,
  TextArea,
  RadioButton,
  Select,
  Field,
  SelectOption,
  ButtonClickEvent,
  Message,
  Hint,
} from "@fider/components"
import { User, UserRole, Tag } from "@fider/models"
import { notify, Failure } from "@fider/services"
import { DropDown, DropDownItem } from "@fider/components"
import { HStack, VStack } from "@fider/components/common/layout"
import IconLightBulb from "@fider/assets/images/heroicons-light-bulb.svg"
import IconSearch from "@fider/assets/images/heroicons-search.svg"

const jonSnow: User = {
  id: 0,
  name: "Jon Snow",
  role: UserRole.Administrator,
  status: UserStatus.Active,
  avatarURL: "/avatars/letter/0/Jon%20Snow",
}

const aryaStark: User = {
  id: 0,
  name: "Arya Snow",
  role: UserRole.Visitor,
  status: UserStatus.Active,
  avatarURL: "/avatars/letter/0/Arya%20Snow",
}

const easyTag: Tag = { id: 2, slug: "easy", name: "easy", color: "FB3A62", isPublic: true }
const hardTag: Tag = { id: 3, slug: "hard", name: "hard", color: "fbca04", isPublic: false }

const visibilityPublic = { label: "Public", value: "public" }
const visibilityPrivate = { label: "Private", value: "private" }

const UIToolkitPage = () => {
  const [error, setError] = useState<Failure | undefined>(undefined)

  const notifyError = async () => {
    notify.error("Something went wrong...")
  }

  const notifySuccess = async () => {
    notify.success("Congratulations! It worked!")
  }

  const notifyStatusChange = (opt?: SelectOption) => {
    if (opt) {
      notify.success(opt.value)
    }
  }

  const showLoading = async (e: ButtonClickEvent) => {
    return e.preventEnable()
  }

  const forceError = async () => {
    setError({
      errors: [
        { field: "title", message: "Title is mandatory" },
        { field: "description", message: "Error #1" },
        { field: "description", message: "Error #2" },
        { field: "status", message: "Status is mandatory" },
      ],
    })
  }

  const renderText = (item?: DropDownItem) => {
    if (item) {
      return `${item.label} (value: ${item.value})`
    }
    return <span>No country is selected</span>
  }

  const renderControl = (item?: DropDownItem) => {
    if (item) {
      return item.render
    }
    return <span>...</span>
  }

  return (
    <div id="p-ui-toolkit" className="page container">
      <h2 className="text-display2 mb-2">1. Colors</h2>

      <div className="color-scale">
        <div className="color gray-900" />
        <div className="color gray-800" />
        <div className="color gray-700" />
        <div className="color gray-600" />
        <div className="color gray-500" />
        <div className="color gray-400" />
        <div className="color gray-300" />
        <div className="color gray-200" />
        <div className="color gray-100" />
        <div className="color gray-50" />
      </div>
      <div className="color-scale">
        <div className="color green-900" />
        <div className="color green-800" />
        <div className="color green-700" />
        <div className="color green-600" />
        <div className="color green-500" />
        <div className="color green-400" />
        <div className="color green-300" />
        <div className="color green-200" />
        <div className="color green-100" />
        <div className="color green-50" />
      </div>
      <div className="color-scale">
        <div className="color red-900" />
        <div className="color red-800" />
        <div className="color red-700" />
        <div className="color red-600" />
        <div className="color red-500" />
        <div className="color red-400" />
        <div className="color red-300" />
        <div className="color red-200" />
        <div className="color red-100" />
        <div className="color red-50" />
      </div>
      <div className="color-scale">
        <div className="color blue-900" />
        <div className="color blue-800" />
        <div className="color blue-700" />
        <div className="color blue-600" />
        <div className="color blue-500" />
        <div className="color blue-400" />
        <div className="color blue-300" />
        <div className="color blue-200" />
        <div className="color blue-100" />
        <div className="color blue-50" />
      </div>
      <div className="color-scale">
        <div className="color yellow-900" />
        <div className="color yellow-800" />
        <div className="color yellow-700" />
        <div className="color yellow-600" />
        <div className="color yellow-500" />
        <div className="color yellow-400" />
        <div className="color yellow-300" />
        <div className="color yellow-200" />
        <div className="color yellow-100" />
        <div className="color yellow-50" />
      </div>

      <h2 className="text-display2 mb-3 mt-6">2. Text</h2>

      <VStack>
        <span className="text-display2">text-display2</span>
        <span className="text-display">text-display</span>
        <span className="text-title">text-title</span>
        <span className="text-body">text-body</span>
        <span className="text-caption">text-caption</span>
        <span className="text-muted">text-muted</span>
        <span className="text-category">text-category</span>
      </VStack>

      <h2 className="text-display2 mb-3 mt-6">3. Segments</h2>

      <Segment>
        <h2>The title</h2>
        <p>The content goes here</p>
      </Segment>

      <Segments>
        <Segment>
          <p>First Segment</p>
        </Segment>
        <Segment>
          <p>Second Segment</p>
        </Segment>
        <Segment>
          <p>Third Segment</p>
        </Segment>
      </Segments>

      <h2 className="text-display2 mb-3 mt-6">4. Avatars</h2>

      <VStack>
        <HStack>
          <Avatar user={jonSnow} /> <UserName user={jonSnow} />
        </HStack>
        <HStack>
          <Avatar user={aryaStark} /> <UserName user={aryaStark} />
        </HStack>
      </VStack>

      <h2 className="text-display2 mb-3 mt-6">5. Page Title</h2>

      <PageTitle title="Page Title" subtitle="This is a page subtitle" />

      <h2 className="text-display2 mb-3 mt-6">6. Buttons</h2>

      <VStack>
        <HStack>
          <Button size="large">
            <IconLightBulb /> <span>Large Icon</span>
          </Button>
          <Button size="large">Large Default</Button>
          <Button color="positive" size="large">
            Large Positive
          </Button>
          <Button color="danger" size="large">
            Large Danger
          </Button>
          <Button color="cancel" size="large">
            Large Cancel
          </Button>
        </HStack>

        <HStack>
          <Button size="normal">
            <IconLightBulb /> <span>Normal Icon</span>
          </Button>
          <Button size="normal">Normal Default</Button>
          <Button color="positive" size="normal">
            Normal Positive
          </Button>
          <Button color="danger" size="normal">
            Normal Danger
          </Button>
          <Button color="cancel" size="normal">
            Normal Cancel
          </Button>
        </HStack>

        <HStack>
          <Button size="small">
            <IconLightBulb /> <span>Small Icon</span>
          </Button>
          <Button size="small">Small Default</Button>
          <Button color="positive" size="small">
            Small Positive
          </Button>
          <Button color="danger" size="small">
            Small Danger
          </Button>
          <Button color="cancel" size="small">
            Small Cancel
          </Button>
        </HStack>

        <HStack>
          <Button size="tiny">
            <IconLightBulb /> <span>Tiny Icon</span>
          </Button>
          <Button size="tiny">Tiny Default</Button>
          <Button color="positive" size="tiny">
            Tiny Positive
          </Button>
          <Button color="danger" size="tiny">
            Tiny Danger
          </Button>
          <Button color="cancel" size="tiny">
            Tiny Cancel
          </Button>
        </HStack>

        <HStack>
          <Button size="mini">
            <IconLightBulb /> <span>Mini Icon</span>
          </Button>
          <Button size="mini">Mini Default</Button>
          <Button color="positive" size="mini">
            Mini Positive
          </Button>
          <Button color="danger" size="mini">
            Mini Danger
          </Button>
          <Button color="cancel" size="mini">
            Mini Cancel
          </Button>
        </HStack>

        <HStack>
          <Button href="#">
            <IconLightBulb /> <span>Link</span>
          </Button>
          <Button href="#">Link</Button>
          <Button href="#" color="positive">
            Link
          </Button>
          <Button href="#" color="danger">
            Link
          </Button>
        </HStack>

        <HStack>
          <Button disabled={true}>
            <IconLightBulb /> <span>Default</span>
          </Button>
          <Button disabled={true}>Default</Button>
          <Button disabled={true} color="positive">
            Positive
          </Button>
          <Button disabled={true} color="danger">
            Danger
          </Button>
        </HStack>

        <HStack>
          <Button onClick={showLoading}>
            <IconLightBulb /> <span>Loading</span>
          </Button>
          <Button onClick={showLoading}>Loading</Button>
          <Button color="positive" onClick={showLoading}>
            Loading
          </Button>
          <Button color="danger" onClick={showLoading}>
            Loading
          </Button>
        </HStack>
      </VStack>

      <h2 className="text-display2 mb-3 mt-6">7. Toggle</h2>

      <List>
        <ListItem>
          <Toggle active={true} label="Active" />
        </ListItem>
        <ListItem>
          <Toggle active={false} label="Inactive" />
        </ListItem>
        <ListItem>
          <Toggle active={true} disabled={true} label="Disabled" />
        </ListItem>
      </List>

      <h2 className="text-display2 mb-3 mt-6">8. Statuses</h2>

      <List>
        <ListItem>
          <ShowPostStatus status={PostStatus.Open} />
        </ListItem>
        <ListItem>
          <ShowPostStatus status={PostStatus.Planned} />
        </ListItem>
        <ListItem>
          <ShowPostStatus status={PostStatus.Started} />
        </ListItem>
        <ListItem>
          <ShowPostStatus status={PostStatus.Duplicate} />
        </ListItem>
        <ListItem>
          <ShowPostStatus status={PostStatus.Completed} />
        </ListItem>
        <ListItem>
          <ShowPostStatus status={PostStatus.Declined} />
        </ListItem>
      </List>

      <h2 className="text-display2 mb-3 mt-6">9. Tags</h2>

      <List>
        <ListItem>
          <ShowTag tag={easyTag} />
          <ShowTag tag={hardTag} />
          <ShowTag tag={easyTag} circular={true} />
          <ShowTag tag={hardTag} circular={true} />
        </ListItem>
      </List>

      <h2 className="text-display2 mb-3 mt-6">10. Notification</h2>

      <List>
        <ListItem>
          <Button onClick={notifySuccess}>Success</Button>
          <Button onClick={notifyError}>Error</Button>
        </ListItem>
      </List>

      <h2 className="text-display2 mb-3 mt-6">11. Moment</h2>

      <List>
        <ListItem>
          Relative: <Moment date="2017-06-03T16:55:06.815042Z" format="relative" />
        </ListItem>
        <ListItem>
          Short: <Moment date="2017-06-03T16:55:06.815042Z" format="short" />
        </ListItem>
        <ListItem>
          Full: <Moment date="2017-06-03T16:55:06.815042Z" format="full" />
        </ListItem>
      </List>

      <h2 className="text-display2 mb-3 mt-6">12. Loader</h2>

      <Loader />

      <h2 className="text-display2 mb-3 mt-6">13. Message</h2>

      <Message showIcon={true} type="error">
        Something went wrong.
      </Message>
      <Message showIcon={true} type="warning">
        Be careful!
      </Message>
      <Message showIcon={true} type="success">
        Your order has been confirmed.
      </Message>

      <h2 className="text-display2 mb-3 mt-6">14. Hints</h2>

      <Hint permanentCloseKey="ui-toolkip-example">Did you know that you can close this permanently?</Hint>
      <Hint>You can&apos;t close this one :)</Hint>

      <h2 className="text-display2 mb-3 mt-6">15. Form</h2>

      <Form error={error}>
        <Input label="Title" field="title">
          <p className="text-muted">This is the explanation for the field above.</p>
        </Input>
        <Input label="Disabled!" field="unamed" disabled={true} value={"you can't change this!"} />
        <Input label="Name" field="name" placeholder={"Your name goes here..."} />
        <Input label="Subdomain" field="subdomain" suffix="fider.io" />
        <Input label="Email" field="email" suffix={<Button color="positive">Sign in</Button>} />
        <TextArea label="Description" field="description" minRows={5}>
          <p className="text-muted">This textarea resizes as you type.</p>
        </TextArea>
        <Input field="age" placeholder="This field doesn't have a label" />

        <div className="row">
          <div className="col-md-3">
            <Input label="Title1" field="title1" />
          </div>
          <div className="col-md-3">
            <Input label="Title2" field="title2" />
          </div>
          <div className="col-md-3">
            <Input label="Title3" field="title3" />
          </div>
          <div className="col-md-3">
            <RadioButton label="Visibility" field="visibility" defaultOption={visibilityPublic} options={[visibilityPrivate, visibilityPublic]} />
          </div>
        </div>

        <Select
          label="Status"
          field="status"
          options={[
            { value: "open", label: "Open" },
            { value: "started", label: "Started" },
            { value: "planned", label: "Planned" },
          ]}
          onChange={notifyStatusChange}
        />

        <Field label="Number">
          <DropDown
            items={[
              { label: "One", value: "1" },
              { label: "Two", value: "2" },
              { label: "Three", value: "3" },
            ]}
            defaultValue={"1"}
            placeholder="Select a number"
          />
        </Field>

        <Field label="Country (custom render text)">
          <DropDown
            items={[
              { label: "Brazil", value: "br" },
              { label: "United States", value: "us" },
              { label: "Ireland", value: "ie" },
            ]}
            defaultValue={"1"}
            renderText={renderText}
            placeholder="Select a number"
          />
        </Field>

        <Field label="Color (custom render control)">
          <DropDown
            items={[
              { label: "Green", value: "green", render: <span style={{ color: "green" }}>Green</span> },
              { label: "Red", value: "red", render: <span style={{ color: "red" }}>Red</span> },
              { label: "Blue", value: "blue", render: <span style={{ color: "blue" }}>Blue</span> },
            ]}
            placeholder="Select a color"
            inline={true}
            style="simple"
            header="What color do you like the most?"
            renderControl={renderControl}
          />
        </Field>

        <Button onClick={forceError}>Save</Button>
      </Form>

      <h2 className="text-display2 mb-3 mt-6">15. Search</h2>

      <Input field="search" placeholder="Search..." icon={IconSearch} />
    </div>
  )
}

export default UIToolkitPage
