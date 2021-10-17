import './App.css';
import React, {useEffect, useState} from 'react';
import Amplify, {API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';

Amplify.configure(awsConfig);
    
function App() {

  const [list, setList] = useState([]);

  const fetchList = async () => {
      const { data } = await API.graphql(graphqlOperation(listLists));  
      setList(data.listLists.items);
      console.log(data);
    } 
  
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <AmplifyAuthenticator>
      <div className="App">
        <h1>Amplify app</h1>
        
        <h2>List</h2>
        {
          list.map(item => <div> {item.title}  </div>)
        }
        </div>
      <AmplifySignOut/>
    </AmplifyAuthenticator>
  );
}



export default App;
