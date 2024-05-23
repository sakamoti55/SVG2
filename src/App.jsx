import { useState,useEffect } from "react";

function changeData(i){
  console.log("aaa")

} 
function Chart (props){ 
  // const data = props.data;
  const {data} = props;

  console.log(data); 
  const leftMargin    = 100;
  const rightMargin   = 500;
  const topMargin     = 100;
  const bottomMargin  = 100;
  const contentWidth  = 400;
  const contentHeight = 400;

  const svgWidth = leftMargin + contentWidth  + rightMargin; 
  const svgHight = topMargin  + contentHeight + bottomMargin; 

  const color = d3.scaleOrdinal(d3.schemeCategory10)
  const max_sepal_length = d3.max(data,(item)=>item.sepalLength);
  const min_sepal_length = d3.min(data,(item)=>item.sepalLength);
  const max_sepal_width  = d3.max(data,(item)=>item.sepalWidth);
  const min_sepal_width  = d3.min(data,(item)=>item.sepalWidth);
  const max_petal_length  = d3.max(data,(item)=>item.petalLength);
  const min_petal_length  = d3.min(data,(item)=>item.petalLength);
  const max_petal_width  = d3.max(data,(item)=>item.petalWidth);
  const min_petal_width  = d3.min(data,(item)=>item.petalWidth);

  const [keepMinX,setKeepMinX] = useState(min_sepal_length);
  const [keepMaxX,setKeepMaxX] = useState(max_sepal_length);
  const xScale = d3.scaleLinear()
    .domain([keepMinX,keepMaxX])
    .range([0,contentWidth]) 
    .nice();
  const [keepMinY,setKeepMinY] = useState(min_sepal_width);
  const [keepMaxY,setKeepMaxY] = useState(max_sepal_width);
  const yScale = d3.scaleLinear()
    .domain([keepMinY,keepMaxY])
    .range([contentHeight,0])
    .nice();

  const setSpecies = new Set(data.map(({species}) => species))
  const arraySpecies = Array.from(setSpecies)

  const [keepX, setKeepX] = useState("sepalLength");
  const [keepY, setKeepY] = useState("sepalWidth");
  const allSpecies = new Array("sepalLength","sepalWidth","petalLength","petalWidth")

  return (
    <div>
      <div>
      <select 
        id="x" 
        onChange={(event) => {
          setKeepX(event.target.value);
          if (event.target.value === "sepalLength") {
            setKeepMaxX(max_sepal_length);
            setKeepMinX(min_sepal_length);
          } else if (event.target.value === "sepalWidth") {
            setKeepMaxX(max_sepal_width);
            setKeepMinX(min_sepal_width);
          } else if (event.target.value === "petalLength") {
            setKeepMaxX(max_petal_length);
            setKeepMinX(min_petal_length);
          } else if (event.target.value === "petalWidth") {
            setKeepMaxX(max_petal_width);
            setKeepMinX(min_petal_width);
          }
        }}
        value={keepX}
        
        >
        {data && allSpecies.map((speciesX) => (
          <option key={speciesX} value={speciesX}>
            {speciesX}
          </option>
        ))}
      </select>
      <select 
        id="y" 
        onChange={(event) => {
          setKeepY(event.target.value);
          if (event.target.value === "sepalLength") {
            setKeepMaxY(max_sepal_length);
            setKeepMinY(min_sepal_length);
          } else if (event.target.value === "sepalWidth") {
            setKeepMaxY(max_sepal_width);
            setKeepMinY(min_sepal_width);
          } else if (event.target.value === "petalLength") {
            setKeepMaxY(max_petal_length);
            setKeepMinY(min_petal_length);
          } else if (event.target.value === "petalWidth") {
            setKeepMaxY(max_petal_width);
            setKeepMinY(min_petal_width);
          }
        }}
        value={keepY}
        >
        {data && allSpecies.map((speciesY) => (
          <option key={speciesY} value={speciesY}>
            {speciesY}
          </option>
        ))}
      </select>
      </div>
      <div>
      <svg width={svgWidth} height={svgHight}>
        <g transform={`translate(${leftMargin},${topMargin})`}>
          {/* 目盛り線 */}
          {
            xScale.ticks().map((x) => {
              return <g transform={`translate(${xScale(x)},0)`}>
                {/* <line x1='0' y1='0' x2='0' y2={contentHeight+5} stroke='grey' /> */}
                <line x1='0' y1={contentHeight} x2='0' y2={contentHeight+5} stroke='grey' />
                <text y={contentHeight +20 } textAnchor='middle'>{x}</text>
              </g>
            })          
          } 
          {
            yScale.ticks().map((y) => {
              return <g transform={`translate(0,${yScale(y)})`}>
                {/* <line x1='0' y1='0' x2={contentWidth+5} y2='0' stroke='grey' /> */}
                <line x1="-5" y1='0' x2='0' y2='0' stroke='grey' />
                <text x="-20" y="5" textAnchor='middle'>{y}</text>
              </g>
            })           
          }
          {/* 左と下の線 */}
          <line x1='0' y1={contentHeight} x2={contentWidth} y2={contentHeight} stroke='grey' />
          <line x1='0' y1='0' x2='0' y2={contentHeight+5} stroke='grey' />
          {/* 外側のプロパティネーム */}
          <text x={contentWidth/2} y={contentHeight+40} textAnchor="middle">Sepal Length</text>
          <g transform="translate(-240,180)rotate(-90)">
            <text x='-20' y={contentHeight/2} textAnchor="middle" >Sepal Width</text>
          </g>
          {/* データのプロット */}
          {
            arraySpecies.map((e)=>{
              /*
              return (
                
                data.filter(({species},i)=>species===e)
                  .map((e1)=>{
                    // e1[keepX]でe1内のプロパティ値keepXにアクセス
                    if(keepTF[i]===true){
                      return <circle cx={xScale(e1[keepX])} cy={yScale(e1[keepY])} r='5' fill={color(e)} /> 
                    }else{
                      return <p></p>; 
                    } 
                  })
                  
              )
              */
              return (
                
                data.filter(({species},i)=>species===e)
                  .map((e1)=>{
                    // e1[keepX]でe1内のプロパティ値keepXにアクセス
                    return <circle cx={xScale(e1[keepX])} cy={yScale(e1[keepY])} r='5' fill={color(e)} /> 

                  })
                  
              )
            })
          }
          {/* 凡例*/}
          {
            arraySpecies.map((e,i)=>{
              return (
                <g transform={`translate(0,${i*30})`}>

                  <rect x={contentWidth} y='0' width='10' height='10' fill={color(e)} onClick={() => changeData(i)}/>
                  <text x={contentWidth+15} y='10'>{e}</text>
                </g>
              )
            })
          }
        </g>
      </svg>
      </div>
    </div>
  );  
}   

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    // async function fetchData()と一緒
    const fetchData = async () => {
      const response = await fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json");
      const result = await response.json();
      setData(result);
    };
    console.log(data);
    fetchData(); 
  }, []);
  
  /*
  let data;
  useEffect(() => {
    // async function fetchData()と一緒
    const fetchData = async () => {
      const response = await fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json");
      const result = await response.json();
      data = result;
      console.log(data);
    };
    console.log(data);
    fetchData(); 
  }, []);
  */

  // データがあるときのみ返す(何かしら返したいから空のp要素を返す)
  return data ? <Chart data={data} /> : <p></p>;
}
 
export default App;   
   