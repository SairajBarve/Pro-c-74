import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ToastAndroid,
 KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';


export default class WriteStoryScr extends React.Component{
    constructor(){
        super();
        this.state={
          title: '',
          author: '',
          story: '',
        }
    }

    submitStory = ()=>{
      db.collection("stories").add({
          title: this.state.title,
          author: this.state.author,
          story: this.state.story
      })
      this.setState({
          title: "",
          author: "",
          story: ""
      })
      //ToastAndroid.show(" Your story has been submitted",ToastAndroid.LONG)
      //ToastAndroid.show(" Your story has been submitted",ToastAndroid.SHORT)
      alert('Story Submitted Successfully ✅✅');
  }
    
    render(){
        return(
          <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>
            <Text style={styles.story}> BEDTIME STORIES APP </Text>
            
          <TextInput style={styles.inputBox} placeholder={'Name of The story'} />
          <TextInput style={styles.inputBox}  placeholder={'Author of The  story'} />
<TouchableOpacity style={styles.submitButton} onPress = {this.submitStory}>
          <Text style={{ justifyContent:'center',
        alignItems:'center',color:"white",fontSize:30,}}>Submit</Text>
        </TouchableOpacity>
          </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 20,
    width: 280,
    alignSelf: 'center',
    height: 40,
 borderRadius:30,
 fontSize:20,
    fontFamily : 'Elephant',
    textAlign: 'center',
    borderWidth: 2,
    backgroundColor: 'white',
    },
      story:{
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'center',
        backgroundColor: 'lightpink',
        color:"black",
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'stencil',
         marginBottom:100,
    },
    submitButton:{
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'center',
        backgroundColor: 'purple',
        marginTop:100,
        width:335,
    },

    
})