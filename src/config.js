let serverURL = 'http://localhost:3001'
if (process.env.NODE_ENV === 'production')
    serverURL = 'https://monda-meet.herokuapp.com/'

export { serverURL }