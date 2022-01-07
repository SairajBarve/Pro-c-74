import * as React from 'react';
import { StyleSheet, Text, View, Image,  KeyboardAvoidingView,FlatList,ScrollView, SafeAreaView} from 'react-native';
import {Header} from 'react-native-elements';
import {SearchBar} from  'react-native-elements';
import db from '../config'
import firebase from 'firebase';

export default class ReadStoryScreen extends React.Component {
  state={
    search:'',
    allStories:[''],
    dataSource:[]
  };

  updateSearch = (search) =>{
     this.setState({ search:search });
  };

componentDidMount(){
    this.retrieveStories()
  }

  retrieveStories=()=>{
    try {
      var allStories= []
      var stories = db.collection("Story")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              
              allStories.push(doc.data())
              console.log('this are the stories',allStories)
          })
          this.setState({allStories:allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.allStories.filter((item)=> {
      //applying filter for the inserted text in search bar
      const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }


    render(){
      
        return(
          <SafeAreaView style={styles.container}>
            <View style={{backgroundColor: 'white'}}>
                

        <SearchBar
        placeholder="Type Here..."
       onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
        />
                
                 <FlatList
               
                        data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                    renderItem={({ item }) => (
                         <View style={{borderBottomWidth: 2}}>
                      <View style={styles.itemContainer}>
                        <Text>Title: {item.Title}</Text>
                    <Text>Author : {item.Author}</Text>
                    <Text>Story: {item.Story}</Text>
                                          </View>
                                                 </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    
                    />
                    
     
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
 
  itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'pink',
    justifyContent:'center',
    alignSelf: 'center',
  }
})