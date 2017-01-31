/**
 * A navigation component
 */
import React, { Component } from 'react'
import { Link, IndexLink, withRouter } from 'react-router'

// import styles from './styles.scss'

class NavItemRouter extends Component {
  render () {
    const { router } = this.props
    const { index, to, children, ...props } = this.props

    let isActive
    if( router.isActive('/',true) && index ) isActive = true
    else  isActive = router.isActive(to)
    const LinkComponent = index ?  IndexLink : Link

    return (
      <li className={isActive ? 'active' : ''}>
        <LinkComponent to={to} {...props}>{children}</LinkComponent>
      </li>
    )
  }
}

NavItemRouter = withRouter(NavItemRouter)

export default NavItemRouter