import Box from "./box";

const style = {
	width: "450px",
	height: "450px",
	margin: "0 auto",
	boxShadow:"0px 5px 20px #000",
	display: "grid",
	gridTemplate: "repeat(15, 30px) / repeat(15, 30px)",
};

const Board = (props) => (
    <div style={style}>
    {[...Array(225)].map((_, pos) => 
	<Box key={pos} 
	name={pos} 
	onClick={()=>props.onClick(pos)} 
	value={props.value[pos]}/>)}
    </div>
)

export default Board