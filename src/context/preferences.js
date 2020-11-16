import React, { useState } from 'react'

const Preferences = React.createContext()

export function PreferencesProvider(props) {
    const [enabledVideo, setEnabledVideo] = useState(true)
    const [enabledAudio, setEnabledAudio] = useState(true)
    const [name, setName] = useState("")

    const value = React.useMemo(() => {
        return {
            enabledAudio, enabledVideo, setEnabledVideo, setEnabledAudio, setName
        }
    }, [enabledVideo, enabledAudio, name])

    return <Preferences.Provider value={value} {...props} />
}

export function UsePreferences() {
    const context = React.useContext(Preferences)
    if (!context)
        throw new Error("Not preferencescontext")

    return context
}