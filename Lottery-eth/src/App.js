import React, { Component } from 'react';
import CardExampleCard from "./display/ui";


let web3 = require('./utils/initWeb3')
let lotteryInstance = require('./eth/lotteryInstance')

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      manager:'',
      round:0,
      winner:'',
      balnace:0,
      playerCounts:0,
      players:[],
      currentAccount:'',
      isShowButton:'',
    }
  }

  //内置钩子函数，在页面渲染之前调用
  async componentWillMount(){
    let accounts = await web3.eth.getAccounts()
    let manager = await lotteryInstance.methods.manager().call()
    let round = await lotteryInstance.methods.round().call()
    let winner = await lotteryInstance.methods.winner().call()
    //获取的balnaceWei单位是wei,需要转化成ether
    let balnaceWei = await lotteryInstance.methods.getBalnace().call()
    let balnace = await  web3.utils.fromWei(balnaceWei,'ether')

    let playerCounts = await lotteryInstance.methods.getPlayerCounts().call()
    let players = await lotteryInstance.methods.getPlayers().call()

    let isShowButton = accounts[0] === manager ? 'inline':'none'

    this.setState({
        manager:manager,
        round:round,
        winner:winner,
        balnace:balnace,
        playerCounts:playerCounts,
        players:players,
        currentAccount:accounts[0],
        isClicking:false,
        isShowButton:isShowButton, //控制管理员按钮是否显示
    })

  }

  play = async () => {
      console.log('play button clicked!')
      //处理真正的业务逻辑

      this.setState({isClicking:true})
      //1.调用play方法
      //2.转钱1ether
      let accounts = await web3.eth.getAccounts()

      try {
          await lotteryInstance.methods.play().send({
              from:accounts[0],
              // value:1*10**18,
              value: web3.utils.toWei('1','ether'),
              gas: '3000000'
          })
          window.location.reload(true)  //重新加载页面
          this.setState({isClicking:false})
          alert('投注成功')
      }catch (e) {
          this.setState({isClicking:false})
          alert('投注失败')
          console.log(e)
      }

}

runLottery = async () => {
  console.log('runLottery button clicked!')
  //处理真正的业务逻辑

  this.setState({isClicking:true})
  //1.调用play方法
  //2.转钱1ether
  let accounts = await web3.eth.getAccounts()

  try {
      await lotteryInstance.methods.runLottery().send({
          from:accounts[0],
          // value:1*10**18,
          // value: web3.utils.toWei('1','ether'),
          gas: '3000000'
      })
      //显示中奖人
      let winner = await lotteryInstance.methods.winner().call()

      window.location.reload(true)  //重新加载页面
      this.setState({isClicking:false})
      alert(`开奖成功\n中奖人${winner}`)
  }catch (e) {
      this.setState({isClicking:false})
      alert('开奖失败')
      console.log(e)
  }

}

returnLottery = async () => {
  console.log('returnLottery button clicked!')
  //处理真正的业务逻辑

  this.setState({isClicking:true})
  //1.调用play方法
  //2.转钱1ether
  let accounts = await web3.eth.getAccounts()

  try {
      await lotteryInstance.methods.returnLottery().send({
          from:accounts[0],
          // value:1*10**18,
          // value: web3.utils.toWei('1','ether'),
          gas: '3000000'
      })
      window.location.reload(true)  //重新加载页面
      this.setState({isClicking:false})
      alert('退奖成功')
  }catch (e) {
      this.setState({isClicking:false})
      alert('退奖失败')
      console.log(e)
  }

}

  render() {

    return (
      <div>
        <CardExampleCard
            manager={this.state.manager}
            round={this.state.round}
            winner={this.state.winner}
            balnace={this.state.balnace}
            playerCounts={this.state.playerCounts}
            players={this.state.players}
            currentAccount={this.state.currentAccount}
            isClicking={this.state.isClicking}
            play={this.play}
            runLottery={this.runLottery}
            returnLottery={this.returnLottery}
            isShowButton={this.state.isShowButton}
        />


      </div>
    );
  }

}

export default App;
/*
<p>hello world</p>
<p>manager:{this.state.manager}</p>
<p>round:{this.state.round}</p>
<p>winner:{this.state.winner}</p>
<p>balnace:{this.state.balnace}</p>
<p>playerCounts:{this.state.playerCounts}</p>
<p>players:{this.state.players}</p>
*/
