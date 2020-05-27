import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2'
import './Chart.css'
import LangRepo from '../LangRepo/LangRepo'
import colors from './colors'


class Chart extends Component {
    
    
    
    state={
        repos:[],
        dataset:[{data:[]}],
        pagec:0,
        loading:false,
        hmap:null,
        language:null
    }
    componentDidMount(){
    const userna=this.props.user.login
    const pagecurrent=this.state.pagec
    if(pagecurrent*100 < this.props.user.public_repos){
      this.fetchReposFull(userna,pagecurrent+1)
    }

    }




    fetchReposFull=async(username,pagecur)=>{
        this.setState({loading:true},async ()=>{
           try{
           const res=await fetch(`https://api.github.com/users/${username}/repos?page=${pagecur}&per_page=${100}`)
         if(res.ok){
           const repos=await res.json();
            this.setState({
             repos:[...this.state.repos,repos],
             pagec:pagecur,
             loading:false
           })
           var map={}
           this.state.repos.map(repo=>{
            
               repo.map(re=>{
                   
                   if(re.language in map){
                       const x=map[re.language]+1
                       delete map[re.language]
                       map[re.language]=x
                   }
                   else{
                       map[re.language]=1
                   } 
                   
               })
           // console.log(map) 
           delete map.null
           this.setState({hmap:map})
           })

         }
         const error=await res.json()
         return{error:error.message}
     
         }catch(err){
           return("Repo Error")
         }
       })
       }
    graphClickEvent=(event, array)=>{
        if(array[0]){
           
           const b=array[0]._model.label
            console.log(b)
            this.setState({
                language:b
            })
           
        }
    }
     


    render() {
        console.log(this.state)
        return (
            <div>
            <LangRepo repos={this.state.repos} lang={this.state.language}/>
            <div className="chart">
            {this.state.hmap && 
               
                <div className="">
                <p className="info">THE USERS RECENT REPOSITRIES STATS</p>
             
                <Pie 
                className="ch"
                data={{
                    labels:Object.keys(this.state.hmap),
                    datasets:[{
                        data:Object.values(this.state.hmap),
                        backgroundColor: colors
                           
                    }],
                }}
                height={430}
                width={650}
                options={
                    {
                        legend:{
                            display:true,
                            fullWidth:true,
                            fontfamily:'Helvetica Neue',
                            align:'start',
                            usePointStyle:false,
                        },
                        title:{
                            display:true,
                            text:"LANGUAGES",
                            padding:10,

                        },
                    animation:{
                        easing:'easeOutQuart',
                        animateScale:true,

                    },
                    'onClick':this.graphClickEvent,
                    layout:{
                        padding: {
                            left: 20,
                            right: 20,
                            top: 10,
                            bottom: 20,
                          }
                    },
                    responsive:true,
                    tooltips: {
                        mode: 'point',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        bodyFontColor: 'white',
                        titleFontColor: 'white',
                        titleFontStyle:'bold',
                        events: ['mousemove', 'mouseout', 'touchstart', 'touchmove', 'touchend'],
                        callbacks: {
                          label: function (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            const total = meta.total;
                            const currentValue = dataset.data[tooltipItem.index];
                            const percentage = parseFloat(
                              ((currentValue / total) * 100).toFixed(1)
                            );
                            return currentValue + ' (' + percentage + '%)';
                          },
                          title: function (tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                          },
                        },
                      },
                      


                }
            }
                />
               
                </div>
            }
               
            </div>
            </div>
        );
    }
}

export default Chart;