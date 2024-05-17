import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <>
            <div style={{ hideWhenVisible, margin: '5px 0' }}>
                <Button variant="primary" onClick={toggleVisibility}>
                    {buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <div style={{ margin: '5px 0' }}>
                    <Button onClick={toggleVisibility}>cancel</Button>
                </div>
            </div>
        </>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
