import React from 'react'
import { Card, Icon, Image, Statistic, Button} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg' />
        <Card.Content>
            <Card.Header>世界杯彩票</Card.Header>
            <Card.Meta>
                <p>管理员地址：{props.manager}</p>
                <p>当前地址：{props.currentAccount}</p>
                <p>上期中奖地址：{props.winner}</p>
            </Card.Meta>
            <Card.Description>每晚8点准时开奖，不见不散!</Card.Description>
        </Card.Content>
        <Card.Content extra>
            
                <Icon name='user' />
                {props.playerCounts} 人参与
           
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balnace}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href='https://ropsten.etherscan.io/address/0x2f36ede67cba500667058ef468a94cb55114a1b6'>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

        <Button animated='fade' color='orange' onClick={props.play} disabled={props.isClicking}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden >购买放飞梦想</Button.Content>
        </Button>

        <Button inverted color='red' style={{display:props.isShowButton}} onClick={props.runLottery} disabled={props.isClicking}>
            开奖
        </Button>
        <Button inverted color='orange' style={{display:props.isShowButton}} onClick={props.returnLottery} disabled={props.isClicking}>
            退奖
        </Button>
    </Card>
)

export default CardExampleCard