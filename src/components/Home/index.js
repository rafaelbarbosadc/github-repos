import React, { Component } from 'react';
import { Container, Header, List, Button, Icon, Input, Image, Card } from 'semantic-ui-react'
import axios from 'axios'
export default class Home extends Component {
  state = {
    loading: false,
    inputValue: 'facebook',
  }

  updateInputValue = e => {
    this.setState({ inputValue: e.target.value })
  }

  get = async () => {
    const { inputValue: username } = this.state;
    this.setState({ loading: true })
    const { data: repos } = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated`)
    let { data: user } = await axios.get(`https://api.github.com/users/${username}`)
    user = { ...user, repos: [...repos.filter((item, i) => i < 5)] }
    this.setState({ user })
    this.setState({ loading: false })

  }
  render() {
    const { user } = this.state
    return (
      <>
        <Container textAlign='center' style={{ margin: 20 }}>
          <Header as="h2" inverted >Click on dev button to load data 😊</Header>
          <Input size='huge' placeholder="Github username" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}></Input>
        </Container>
        <Container textAlign='center' style={{ margin: 20 }}>
          <Button inverted size='huge' loading={this.state.loading} onClick={this.get}>
            <Icon fitted size="large" name="code" />
          </Button>
        </Container>
        {this.state.user && this.state.user.repos ?
          <Container inverted textAlign='center' style={{display: 'flex', justifyContent: 'center'}}>
            <Card style={{paddingTop: '5px'}}>
            <Image style={{background: 'none'}}  circular centered size="small" src={user.avatar_url ? user.avatar_url : null} />
            <Header as="h3">{user.name}</Header>
            <List className="reposContainer" centered style={{ marginTop: '1vh' }}>
              {(this.state.user.repos).map(item => (
                <List.Item>
                  <Card style={{marginTop: '10px', padding: '5px', background: '#F2F2F2'}}>
                    <Card.Content>
                      <Card.Header>{item.full_name}</Card.Header>
                      <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a target="_blank" href={item.html_url}><Icon name="github"></Icon></a>
                    </Card.Content>
                    </Card>
                </List.Item>
              ))}
            </List>
          </Card>
          </Container>
          : null}

      </>
    )
  }
}
