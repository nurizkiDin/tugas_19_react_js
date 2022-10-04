import React, {Component} from "react";
import axios from "axios";
import { 
    Card, Input 
} from "semantic-ui-react";
import "./tombol.css"

class Api extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataKaryawan: [],
            edit: false,
            inputData: {
                id : null,
                nama_karyawan : "",
                jabatan : "",
                jenis_kelamin: "",
                tanggal_lahir: ""
            }
        }
        this.tampilData = this.tampilData.bind(this);
        this.hapusData = this.hapusData.bind(this);
        this.buatData = this.buatData.bind(this);
        this.editData = this.editData.bind(this);
        this.myRef = React.createRef();
    }
    tampilData(){
        axios.get("http://localhost:3004/data-karyawan")
        .then(res => {
            this.setState({
                dataKaryawan: res.data
            })
        })
    }
    hapusData(e){
        axios.delete(`http://localhost:3004/data-karyawan/${e.target.value}`)
        .then(() => {this.tampilData()})
    }
    input = (e) => {
        let dt = {...this.state.inputData}
        dt[e.target.name] = e.target.value
        if(this.state.edit===false){    
            dt["id"] = Date.now()   
        }
        this.setState({
            inputData: dt
        })
    }
    edit = (e) => {
        this.setState({edit:true, inputData:{id:e.target.value}})
        axios.get(`http://localhost:3004/data-karyawan/${e.target.value}`)
        .then(res => {
            this.setState({
                inputData: {
                    id: res.data.id,
                    nama_karyawan : res.data.nama_karyawan,
                    jabatan : res.data.jabatan,
                    jenis_kelamin: res.data.jenis_kelamin,
                    tanggal_lahir: res.data.tanggal_lahir
                }
            })
        })
    }
    buatData(){
        axios.post("http://localhost:3004/data-karyawan", this.state.inputData)
        .then(() => {this.tampilData()})
    }
    editData(e){
        axios.put(`http://localhost:3004/data-karyawan/${e.target.value}`, this.state.inputData)
        .then(() => {this.tampilData()})
    }
    simpan = (e) => {
        if(this.state.edit===false){
            this.buatData()
        }else{
            this.editData(e)
            this.setState({edit:false})
        }
        this.setState({
            inputData: {
                id: null,
                nama_karyawan : "",
                jabatan : "",
                jenis_kelamin: "",
                tanggal_lahir: ""
            }
        })
    }
    componentDidMount(){
        // fetch("http://localhost:3004/posts")
        // .then(response => response.json())
        // .then(res => {
        //     this.setState({
        //         data: res
        //     })
        // })
        this.tampilData();
    }
    render(){
        return(
            <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                <div style={{marginBottom: "15px"}}>
                    <Input name="nama_karyawan" placeholder="Nama" value={this.state.inputData.nama_karyawan} onChange={this.input}/>
                    <Input name="jabatan" placeholder="jabatan" value={this.state.inputData.jabatan} onChange={this.input}/>
                    <Input name="jenis_kelamin" placeholder="jenis_kelamin" value={this.state.inputData.jenis_kelamin} onChange={this.input}/>
                    <Input type="date" name="tanggal_lahir" value={this.state.inputData.tanggal_lahir} onChange={this.input}/>
                    <button type="submit" className="simpan" value={this.state.inputData.id} onClick={this.simpan}>
                        Simpan Data
                    </button>
                </div>
                <Card.Group>
                    {this.state.dataKaryawan.map((data, index)=>{
                        return(
                            <Card key={index}>
                                <Card.Content>
                                    <Card.Header>{data.nama_karyawan}</Card.Header>
                                    <Card.Meta>{data.jabatan}</Card.Meta>
                                    <Card.Description>
                                        Tanggal Lahir : {data.tanggal_lahir}<br/>
                                        Jenis Kelamin : {data.jenis_kelamin}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div style={{textAlign: "center"}}>
                                        <button
                                            className="edit"
                                            value={data.id}
                                            onClick={this.edit}>
                                            Edit
                                        </button>
                                        <button 
                                            className="hapus"
                                            value={data.id} 
                                            onClick={this.hapusData}>
                                            Hapus
                                        </button>
                                    </div>
                                </Card.Content>
                            </Card>
                        );
                    })}
                </Card.Group>
            </div>
        );
    }
}

export default Api;