import React, {useState} from "react";
import{Container,FormGroup,Input } from "reactstrap"

const UploadImages = ({catchImage}) => {

  
    const [loading, setLoading] = useState(false);

    const upImage = async (e)=> {
        const files= e.target.files;
        const data = new FormData();
        data.append("file",files[0]);
        data.append("upload_preset","chillydevs");
        setLoading(true);
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dy95d00op/image/upload",
            {
                method:"POST",
                body:data,
            }
        )
        const file = await res.json();
        console.log(res)
        catchImage(file.secure_url)
        setLoading(false)
    }

    return ( 
        <div>
            <Container>
                <h1>
                    Upload Images
                </h1>
                <FormGroup>
                    <Input
                    type = "file"
                    name = "file"
                    placeholder= "Upload your image here"
                    onChange = {upImage}
                   />
                </FormGroup>
            </Container>
        </div>
     );
}
 
export default UploadImages;
