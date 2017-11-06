/*
React-Native-Masonry Demo
https://github.com/brh55/react-native-masonry
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
  Slider
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Masonry from 'react-native-masonry';

// list of images
let data = [
  {
    data: {
      caption: 'Summer Recipies',
      user: {
        name: 'Henry'
      },
    },
    uri: 'https://s-media-cache-ak0.pinimg.com/736x/32/7f/d9/327fd98ae0146623ca8954884029297b.jpg',
    renderFooter: (data) => {
      return (
        <View key='brick-header' style={{backgroundColor: 'white', padding: 5, paddingRight: 9, paddingLeft: 9}}>
          <Text style={{lineHeight: 20, fontSize: 14}}>{data.caption}</Text>
        </View>
      )
    },
    renderHeader: (data) => {
      return (
        <View key='brick-footer' style={styles.headerTop}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsO3JMW5pmK-pq9g3T-1znMMK8IEELKnasQ6agJANePV7Z0nwp9w' }}
            style={styles.userPic}/>
          <Text style={styles.userName}>{data.user.name}</Text>
        </View>
      )
    }
  },
  {
    uri: 'https://s-media-cache-ak0.pinimg.com/736x/b1/21/df/b121df29b41b771d6610dba71834e512.jpg',
  },
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpD8mz-2Wwix8hHbGgR-mCFQVFTF7TF7hU05BxwLVO1PS5j-rZA',
  },
  {
    uri: 'https://s-media-cache-ak0.pinimg.com/736x/5a/15/0c/5a150cf9d5a825c8b5871eefbeda8d14.jpg'
  },
  {
    uri: 'https://s-media-cache-ak0.pinimg.com/736x/04/63/3f/04633fcc08f9d405064391bd80cb0828.jpg'
  },
  {
    uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQRWkuUMpLyu3QnFu5Xsi_7SpbabzRtSis-_QhKas6Oyj3neJoeug'
  },
  {
    uri: 'https://s-media-cache-ak0.pinimg.com/736x/a5/c9/43/a5c943e02b1c43b5cf7d5a4b1efdcabb.jpg'
  },
  {
    uri: 'https://i0.wp.com/www.youbodyhealth.com/wp-content/uploads/2016/08/Delicious-Foods-can-Harm-Your-Brain.jpg?'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/29/15/campaign_images/buzzfeed-prod-fastlane-03/26-delicious-korean-foods-you-need-in-your-life-2-30138-1490814365-13_dblbig.jpg',
  },
  {
    uri: 'https://pbs.twimg.com/media/B59AOmICQAAiGGj.png',
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr05/17/17/enhanced-buzz-orig-2548-1387320822-8.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-03/17/15/enhanced/webdr13/enhanced-6527-1426620797-18.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/1/15/enhanced/webdr02/enhanced-18393-1417466529-5.jpg'
  },
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXTmdaGSOFK8iBeYqoA6_XiQGGWvu6KGnqAxXYyvJA-JKin8ImQ'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-04/3/15/enhanced/webdr06/enhanced-24427-1428089292-2.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/28/12/asset/buzzfeed-prod-web-09/sub-buzz-24236-1482944714-1.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-03/7/17/enhanced/webdr08/enhanced-buzz-8155-1457391039-5.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/30/12/asset/buzzfeed-prod-fastlane-01/sub-buzz-24597-1490890739-1.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/14/20/campaign_images/webdr15/which-delicious-mexican-food-item-are-you-based-o-2-20324-1452822970-1_dblbig.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-11/30/10/enhanced/webdr15/enhanced-18265-1448896942-17.jpg'
  },
  {
    uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-12/30/16/enhanced/webdr04/enhanced-15965-1451509932-6.jpg'
  }
];

const addData = [
  {
    uri: 'https://i.pinimg.com/736x/48/ee/51/48ee519a1768245ce273363f5bf05f30--kaylaitsines-dipping-sauces.jpg'
  },
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYfU5N8lsJepQyoAigiijX8bcdpahei_XqRWBzZLbxcsuqtiH'
  },
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPL2GTXDuOzwuX5X7Mgwc3Vc9ZIhiMmZUhp3s1wg0oHPzSP7qC'
  }
];

export default class example extends Component {
  constructor() {
      super();

      this.state = {
        columns: 2,
        padding: 5,
        data
      };
  }

  _addData = () => {
    const appendedData = [...data, ...addData];
    this.setState({
      data: appendedData
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <View style={[styles.center, styles.header]}>
          <Text style={{ fontWeight: '800', fontSize: 20 }}>Masonry Demo</Text>
        </View>

        <View style={[styles.center, styles.buttonGroup, { marginTop: 10, marginBottom: 25 }]}>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 2 })}>
            <Text>2 Column</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 3 })}>
            <Text>3 Columns</Text>
          </TouchableHighlight>
          <TouchableHighlight  style={styles.button} onPress={() => this.setState({ columns: 6 })}>
            <Text>6 Columns</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 9 })}>
            <Text>9 Columns</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonGroup, {marginLeft: 4}}>
          <TouchableHighlight style={styles.button} onPress={this._addData}>
            <Text>Push New Data</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.center, styles.slider, { marginTop: 10, marginBottom: 25, flexDirection: 'column'}]}>
          <View style={{paddingLeft: 10}}>
            <Text>Dynamically adjust padding: {this.state.padding}</Text>
          </View>
          <View style={{width: '100%'}}>
            <Slider
              style={{height: 10, margin: 10}}
              maximumValue={40}
              step={5}
              value={20}
              onValueChange={(value) => this.setState({padding: value})} />
          </View>
        </View>

        <View style={{flex: 1, flexGrow: 10, padding: this.state.padding}}>
          <Masonry
            sorted
            bricks={this.state.data}
            columns={this.state.columns}
            customImageComponent={FastImage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    flex: 1,
    flexBasis: '10%'
  },
  header: {
    flexGrow: 1
  },
  buttonGroup: {
    flexGrow: 1
  },
  slider: {
    flexGrow: 1
  },
  button: {
    backgroundColor: '#dbdcdb',
    padding: 10,
    marginRight: 4,
    borderRadius: 4,
    borderBottomColor: '#7b7b7b',
    borderBottomWidth: 5
  },
  buttonText: {
    color: '#404040'
  },
  center: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerTop: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userPic: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10
  },
  userName: {
    fontSize: 20
  }
});
