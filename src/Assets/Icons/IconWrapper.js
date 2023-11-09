export default function IconWrapper({ resource, height = "32px", width , alt = "logo"}){
    if(!resource){ return }

    if(resource instanceof Array){
        return resource.map((res, index)=> {
            return <img src={require(`./${res}`)} height={height} width={width} alt={alt} key={index}/>
        })
    }
    
    return <img src={require(`./${resource}`)} height={height} alt={alt} width={width}/>
}