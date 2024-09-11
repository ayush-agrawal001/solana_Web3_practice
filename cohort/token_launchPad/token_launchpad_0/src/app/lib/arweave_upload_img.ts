
import * as sec_guy from "./sec.json" 

export default async function uploadImage(formData : FormData){
    const data = formData.get("image") as File
    const buff =  (await data.arrayBuffer()).slice(0,)
    // return new Uint8Array(buff)

    return new Promise(async (resolve, reject) => {
        const response = await fetch('https://api.akord.com/files', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Api-Key': sec_guy.API_KEY,
                'Content-Type': 'image/png'
            },
            body: new Uint8Array(buff)
        })

        const result = await response.json()        

        if (response.status === 201 || response.status === 200 ){
            resolve({success : result.tx.viewblockUrl})
        }else{
            reject({error : "Upload Failed"})
        }
    })
}