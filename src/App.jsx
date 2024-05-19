import { useEffect, useState } from "react";

function Chart (props){
  const { data } = props;

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

  const xScale = d3.scaleLinear()
    .domain([min_sepal_length,max_sepal_length])
    .range([0,contentWidth]) 
    .nice();

  const yScale = d3.scaleLinear()
    .domain([min_sepal_width,max_sepal_width])
    .range([contentHeight,0])
    .nice();

  const setSpecies = new Set(data.map(({species}) => species))
  const arraySpecies = Array.from(setSpecies)
  console.log(arraySpecies)

  return (
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
            return (
              data.filter(({species})=>species===e)
                .map((e1)=>{
                  return <circle cx={xScale(e1.sepalLength)} cy={yScale(e1.sepalWidth)} r='5' fill={color(e)} />             
                })
            )
          })
        }
        {/* 凡例*/}
        {
          arraySpecies.map((e,i)=>{
            return (
              <g transform={`translate(0,${i*30})`}>
                <rect x={contentWidth} y='0' width='10' height='10' fill={color(e)}/>
                <text x={contentWidth+15} y='10'>{e}</text>
              </g>
            )
          })
        }
      </g>
    </svg>
  );  
}   

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("エラー", error);
      }
    };
    fetchData();
  }, []);
  // データがあるときのみ返す(何かしら返したいから空のp要素を返す)
  return data ? <Chart data={data} /> : <p></p>;
}

export default App;