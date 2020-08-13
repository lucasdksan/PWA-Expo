import React, {useState, useEffect} from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

interface Member{
    login: string;
    avatar_url: string;
}

const Main: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    useEffect(()=>{
        fetch('https://api.github.com/orgs/rocketseat/members').then(res=>{
            res.json().then(data=>{
                setMembers(data);
            });
        });
    },[]);
    return (
      <FlatList
        contentContainerStyle={{padding: 24}}
        data={members}
        keyExtractor = {member => member.login}
        renderItem={({item: member}) =>(
            <View style={styles.member}>
                <Image style={styles.image} source={{uri: member.avatar_url}}/>
                <Text>{member.login}</Text>
            </View>
        )}
      />
  );
}

const styles = StyleSheet.create({
    image:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    member:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    }
});

export default Main;