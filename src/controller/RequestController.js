const request = require('request')

        //let user =  req.body.name    
        // let url = https://www.instagram.com/`{user}`/?__a=1

    const RequestController= (req,res)=>{     
        let url = 'http://0.0.0.0:8882/api/user'

            request(url,(err,response)=>{

            let dados = JSON.parse(response.body)
            let userdados = dados[0]["graphql"]
            let username = userdados["username"]  
            let urlImageProfile = userdados["profile_pic_url"]  
            let profile = userdados["user"]       
            let fullName = profile["full_name"] 
            let followersNumber = JSON.stringify(profile["edge_followed_by"]["count"])
            let posts = dados[0]["edge_owner_to_timeline_media"]            
            let postNumber = JSON.stringify(posts["count"])
            let followedNumber = JSON.stringify(profile["edge_follow"]["count"])                
            let postsData = posts["edges"]
            let comments = 0
            let likes = 0
            
            

            for( let i = 0 ; i < postsData.length-2 ; i++){
             comments += parseInt(JSON.stringify(postsData[i]["node"]["edge_media_to_comment"]["count"]))
             likes += parseInt(JSON.stringify(postsData[i]["node"]["edge_liked_by"]["count"]))        
        
               function media(x,y){
                 return Math.round(x/y)
    
             }

            let mediaComments = media(comments,postsData.length)
            let mediaLikes = media(likes,postsData.length)
            let data =[{
                        nome:fullName,
                        followed:followedNumber,
                        followers:followersNumber,
                        posts:postNumber,
                        likes:mediaLikes,
                        comments:mediaComments,
                        user:username,
                        img:urlImageProfile
                    }]                   
                        return res.render('Informations',{ dados: data })   
            } 
        })   
    }


    module.exports = RequestController