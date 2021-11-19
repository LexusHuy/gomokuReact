import React, { useEffect }  from 'react'
import Game from './components/game' 

const App = () => {
    //giving title to the tab
    useEffect(() => {
        document.title = "tic-tac-toe"
    }, [])

    return <Game/> 
}
export default App;