import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Icon } from '@fluentui/react/lib/Icon';


export default class MenuComponent extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      listLink: [
        { title: 'HOME', link: '/', icon: <Icon iconName="Home" /> },
        { title: 'SOAP', link: '/soap', icon: <Icon iconName="Send" /> },
        { title: 'SQL', link: '/sql', icon: <Icon iconName="Database" /> }
      ],
    }
  }
  render() {
    return (
      <Grid container spacing={3} direction="column" justify="flex-start" alignItems="flex-start" style={{ width: "100%", margin: "0px"}}>
        {this.state.listLink.map((item, index) => (
          <Grid item key={index} style={{ width: "100%" }} >
            <Link to={item.link}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={2} style={{ width: "100%" }} className="MenuIcon" >
                  {item.icon}
                </Grid>
                <Grid item xs={10} style={{ width: "100%" }} className="MenuText" >
                  {item.title}
                </Grid>
              </Grid>
            </Link>
          </Grid>
        ))}
      </Grid>
    )
  }
}