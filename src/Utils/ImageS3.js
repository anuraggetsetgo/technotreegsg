import { Skeleton } from '@material-ui/lab';
import React, { Component } from 'react';
import { getSignedUrl } from './FetchImgs';
//import PreloadImage from './Preloadimg';

const emptyImage = ["https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg']
class ImageS3 extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:true};
        //console.log(props);
    }
    imgError() {
        console.log("Error");
        this.setState({ imgURL: emptyImage[1] })
        this.setState({ loading: false })

    }
    sendImageToParentComp(imgURL) {
        return (this.props.getImageURL(imgURL))
    }
    componentDidMount() {
        getSignedUrl(this.props.imgSrc, 'image/jpeg', this.props.folder, 'getObject').then((data) => {
            let tmpURL = data.replace('s3', 's3-accelerate')
            console.log(tmpURL)
            this.setState({ imgURL: tmpURL });
            //this.setState({ loading: false })
            if (this.props.getImageURL) { this.sendImageToParentComp(tmpURL) }//Passing Back to parent
        })
            .catch(err => {
                this.setState({ error: true });
            })
    }
    render() {

        return (
            <div>
               {<img src={this.state.imgURL} alt="loading" onLoad={()=>this.setState({ loading: false })} style={this.state.loading?{display:"none"}:(this.props.style || { width: '100%' })} onError={() => { this.imgError() }} />}
                {this.state.loading&&<Skeleton style={{ width: '100%' }}></Skeleton>}
            </div>
        )
    }
}
export default ImageS3
