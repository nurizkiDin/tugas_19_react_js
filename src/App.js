import Api from "./Controller";
import { 
  Grid, Icon,
} from "semantic-ui-react";

function App() {
  return (
    <Grid>
      <Grid.Row color="teal" textAlign="center">
        <Grid.Column width={16}>
          <br/>
          <Icon name="book" size="huge"/>
          <h3>Data Karyawan</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3} centered>
        <Grid.Column width={12}>
          <Api />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
