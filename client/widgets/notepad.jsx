import React from 'react';
import _ from 'underscore';

class Notepad extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {};
    this.state.notepad = this.props.notepad;
    // on-start settings
    // this.state.notepad.selectedId = null;
    // this.state.notepad.nextNodeId = this.state.notepad.nextNodeId || 1;
    this.handleNPtoMainChange = this.handleNPtoMainChange.bind(this);
  }
  onAddNote() {
    let note = {id: this.state.notepad.nextNodeId, content: ''};

    let currentNotepad = this.state.notepad;

    currentNotepad.nextNodeId = currentNotepad.nextNodeId +1;
    currentNotepad.notes.push(note);
    currentNotepad.selectedId = note.id;

    this.setState({notepad:currentNotepad});
    // transfers from notepad to main
    this.handleNPtoMainChange(this.state.notepad);
  }
  onChangeNote(id, value) {
    let currentNotepad = this.state.notepad;
    let note = _.find(currentNotepad.notes, (note) => {
        return note.id === id;
    });
    if (note) {
        note.content = value;
        // console.log("value: ", value);
        // currentNotepad.notes[id-1].content = value;
    }
    this.setState({notepad:currentNotepad});
    // transfers from notepad to main
    this.handleNPtoMainChange(this.state.notepad);
  }
  onDeleteNote(id) {
    let currentNotepad = this.state.notepad;
    let note = _.find(currentNotepad.notes, (note) => {
        return note.id === id;
    });
    if (note) {
      currentNotepad.notes = currentNotepad.notes.filter( (note) => {
          return note.id !== id;
      });
    }
    if (currentNotepad.selectedId === id) {
      currentNotepad.selectedId = null;
    }
    this.setState({notepad:currentNotepad});
    // transfers from notepad to main
    this.handleNPtoMainChange(this.state.notepad);
  }
  onSelectNote(id) {
    let currentNotepad = this.state.notepad;
    currentNotepad.selectedId = id;
    this.setState({notepad:currentNotepad});
    // transfers from notepad to main
    this.handleNPtoMainChange(this.state.notepad);
    // console.log("ID from Notepad: ", id);
  }
  handleNPtoMainChange(whichState) {
    this.props.handleNPchange(whichState);
  }
  render() {

    // let notepad = this.props.notepad;
    let notepad = this.state.notepad;

    let editor = null;

    let selectedNote = _.find(notepad.notes, (note) => {
      return note.id === notepad.selectedId;
    });

    if (selectedNote) {
      editor = <NoteEditor note={selectedNote} onChange={this.onChangeNote.bind(this)}/>
    }

    let notepadStyle = {
      // backgroundImage: 'url("http://www.myfreetextures.com/wp-content/uploads/2014/10/seamless-wood5.jpg")'
      // width: "80%",
      // align: "center"
    };
    // style={notepadStyle}

    return (
      <div id="notepad">
        <div className="leather">
          <div className="leather-stitch">
            <NotesList notepad={notepad} handleClickFromNL={this.onSelectNote.bind(this)}
            handleDelete={this.onDeleteNote.bind(this)} />
          </div>
        </div>
          <div style={{textAlign: "center"}}>
            <div>
              <button className="addnote" onClick={this.onAddNote.bind(this)}>Add Note</button>
              <br />
              {editor}
            </div>
          </div>
      </div>
    );

  }

}

export default Notepad;

class NoteEditor extends React.Component {
  onChange(event) {
    // if (event.target.value === '\n') console.log("RETURN!")
    this.props.onChange(this.props.note.id, event.target.value);
  }
  render() {
    let textareaStyle = {
      border: "0.1em solid #ccc",
      borderRadius: "0.5em",
      backgroundColor: "#ffffe6",
      resize: "both"
    };
    return (
        <textarea style={textareaStyle} rows={8} cols={60} value={this.props.note.content} onChange={this.onChange.bind(this)} placeholder="Write your note here..."/>
    );
  }

}

class NotesList extends React.Component {
  handleClick(id) {
    this.props.handleClickFromNL(id);
  }
  handleDelete(id) {
    this.props.handleDelete(id);
  }
  render() {
    let count = 0;
    let notes = this.props.notepad.notes;
    let selectedId = this.props.notepad.selectedId;

    // console.log("selected id: ", selectedId);

    let textStyle = {
      fontWeight: "normal",
      color: "orange",
      paddingRight: "2cm",
      wordWrap: "break-word"
    };

    let selectedStyle = {
      fontWeight: "bold",
      color: "#FA8072",
      paddingRight: "2cm",
      wordWrap: "break-word"
    };
    return (
      <div className="notes-list" style={{borderBottom: "solid 1px gray", backgroundColor: "#FFFACD", margin: "0 auto", width: "100%", height: "280px", overflow: "auto", backgroundImage: 'url("http://megandalbey.com/codepen/css-selectors/paper.jpg")', fontFamily: "Courier, monospace"}}>
      {
        notes.map( (note) => {
          return (
            <NoteSummary
              note={note}
              handleClick={this.handleClick.bind(this)}
              handleDelete={this.handleDelete.bind(this)}
              textStyle={selectedId === note.id ? selectedStyle : textStyle}
              />
          );
        })
      }
      </div>
    );
  }

}

class NoteSummary extends React.Component {
  render() {
    let note = this.props.note;
    // let title = note.content;
    // if (title.indexOf('\n') > 0) {
    //     title = note.content.substring(0, note.content.indexOf('\n'));
    // }
    // if (!title) {
    //     title = '-- Awaiting Input --';
    // }

    let content = note.content;
    if (!content) content = '-- Awaiting Input --';

    let buttonStyle = {
      height: "24px",
      width: "24px",
      // position:"absolute",
      // right:"0",
      textAlign: "center",
      float: "right"
    };

    return (
      <div className="note-summary" style={{width:"100%", borderTop: "solid 1px gray"}}>
        <div className="note-summary-innerwrapper" style={{width:"100%"}}>
          <button
            className='close-button'
            aria-label="Delete Note"
            style={buttonStyle} onClick={()=>{this.props.handleDelete(note.id)}}>&times;</button>
          <pre style = {this.props.textStyle}
            onClick={()=>{this.props.handleClick(note.id)}}>
            {'\n' + content}
          </pre>
        </div>
      </div>
    );
  }

}



// {
//   id: 1,
//   content: "Hello, world!\nBoring.\nBoring.\nBoring."
// },
// {
//   id: 2,
//   content: "React is awesome.\nSeriously, it's the greatest."
// },
// {
//   id: 3,
//   content: "Robots are pretty cool.\nRobots are awesome, until they take over."
// },
// {
//   id: 4,
//   content: "Monkeys.\nWho doesn't love monkeys?"
// }
