import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2'
import './Chart.css'
import colors from './colors'


class Chart extends Component {
    state={
        repos:[],
        labels:[],
        dataset:[{data:[]}],
        pagec:0,
        loading:false,
        hmap:null
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
               var map={}
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


    render() {
        console.log(this.state)
        return (
            <div className="chart">
            {this.state.hmap && 
                <div className="">
                <Pie 
                className="ch"
                data={{
                    labels:Object.keys(this.state.hmap),
                    datasets:[{
                        data:Object.values(this.state.hmap),
                        backgroundColor: colors
                           
                    }],
                }}
                height={400}
                width={500}

                />
                </div>
            }
               
            </div>
        );
    }
}

export default Chart;