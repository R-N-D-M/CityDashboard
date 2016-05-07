import React from 'react';
import _ from 'underscore';

class Notepad extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {};
    this.state.notepad = this.props.notepad;
    // on-start settings
    this.state.notepad.selectedId = null;
    this.state.notepad.nextNodeId = this.state.notepad.nextNodeId || 1;
    this.handleNPtoMainChange = this.handleNPtoMainChange.bind(this);
  }
  onAddNote = function () {
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

    let selectedNote = _.find(notepad.notes, function (note) {
      return note.id === notepad.selectedId;
    });

    if (selectedNote) {
      editor = <NoteEditor note={selectedNote} onChange={this.onChangeNote.bind(this)}/>
    }

    return (
      <div id="notepad">
        <NotesList notepad={notepad} handleClickFromNL={this.onSelectNote.bind(this)} />
        <br />
          <div>
            <button onClick={this.onAddNote.bind(this)}>Add note</button>
          </div>
          {editor}
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
    return (
        <textarea rows={5} cols={40} value={this.props.note.content} onChange={this.onChange.bind(this)} style={{resize: "both"}} />
    );
  }

}

class NotesList extends React.Component {
  handleClick(id) {
    // console.log("ID from NotesList: ", id);
    this.props.handleClickFromNL(id);
  }
  render() {
    let count = 0;
    let notes = this.props.notepad.notes;
    let selectedId = this.props.notepad.selectedId;
    // console.log("selected id: ", selectedId);

    let textStyle = {
      fontWeight: "normal",
      color: "orange"
    };

    let selectedStyle = {
      fontWeight: "bold",
      color: "#FA8072"
    };
    return (
      <div className="notes-list" style={{borderBottom: "solid 1px gray", backgroundColor: "#FFFACD"}}>
      {
        notes.map( (note) => {
          return (
            <NoteSummary
              key={note.id}
              note={note}
              handleClick={this.handleClick.bind(this)}
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
    // console.log("content: ", content)
    if (!content) content = '-- Awaiting Input --';
// style={{width:"100%", borderTop: "solid 1px gray"}}
// style={{color: "orange" }}
    return (
      <div className="note-summary" style={{width:"100%", borderTop: "solid 1px gray"}}>
        <pre style = {this.props.textStyle}
          onClick={()=>{this.props.handleClick(note.id)}}>{content}</pre>
      </div>
    );
  }

}
