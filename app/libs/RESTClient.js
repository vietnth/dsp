import { getBaseURL } from '../configs/config';

let networkError = {
    error_code: -1,
    message: 'Network error',
    data: {}
};

export class RESTFulAPI {

    //Định nghĩa một api lấy language từ server.
    // Public api có sẵn tại https://api.ice5.skyx.app/get_languages
    getTacpham(){
        let api = this.getTacpham;
        return this.fetchTacpham(api);
    }
    async fetchTacpham(api){
     fetch('https://chammuseum.dsp.vn/api.aspx/getlistanpham',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pID: '1833',
              qty: '13'
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              //alert(responseJson.d);
              //console.error(responseJson.d);
      
              this.setState({
                isLoading: false,
                dataSource: JSON.parse(responseJson.d),
                txt: responseJson.d ,
              }, function(){
      
              });
              let tacphamlist = JSON.parse(responseJson.d);
              return tacphamlist;
          })
      
            .catch((error) =>{
              //console.error(error);
              return error;
            });
    }


    getUser() {
      let apilogin= this.getUser;
      return this.fetchUser(api);
    }

    async fetchUser(apilogin,username,pass,keys){
      fetch(apilogin,{
             method: 'POST',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
               user_name: username,
               pass_word: pass,
               keys: keys
             }),
           })
             .then((response) => response.json())
             .then((responseJson) => {
               alert(responseJson.d);
               //console.error(responseJson.d);
       
               this.setState({
                 isLoading: false,
                 dataSource: JSON.parse(responseJson.d),
                 txt: responseJson.d ,
               }, function(){
       
               });
               let userifo = JSON.parse(responseJson.d);
               return userifo;
           })
       
             .catch((error) =>{
               //console.error(error);
               return error;
             });
     }

    //Định nghĩa một hàm bất đồng bộ hỗ trợ các phương thức, GET, POST, PUT, DELETE (mặc định là GET)
    async fetchData(api, method = 'GET', body) {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            let response = await fetch(api, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            return networkError;
        }
    }
}

export default RESTClient = new RESTFulAPI();
