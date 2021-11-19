

export const Box = (props) => {
	if (props.value === "X") {
		var style = {
			border: "2px solid red",
			fontSize: "20px",
			color: "red",
		} 
	}
	if (props.value === "O") {
		 style = {
			border: "2px solid blue",
			fontSize: "20px",
			color: "blue",
		}
	}
	return( 
	 <button 
	name={props.name}  
	style={style}  
	onClick={props.onClick}> 
	{props.value}
	</button>
	)}
	

export default Box;