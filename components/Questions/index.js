import React from "react";
import Questions from "./QuestionBox";
import RegistanceService from "../../service/RegistanceService";
import env from '../../config/envConfig'

export default class Quesions extends React.Component {
  state = {
    questions: [
      {
        id: ""
      }
    ]
  }

  handleClick  = (e) => {
    window.location.href = `${env.PATH_QUESTIONS}/checkanswer?questionid=${e.target.id}`
  }

  async componentDidMount() {
    const reqQuestions = await RegistanceService.getAllQuestions();
    this.setState({
      questions: reqQuestions.data
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <h1>ตรวจคำถาม</h1>
        <div className="row mt-5">
          <Questions questions={this.state.questions} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}
