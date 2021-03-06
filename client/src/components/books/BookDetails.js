import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import Modal from 'react-modal';

import BasketService from '../../services/BasketService';
import BooksService from '../../services/BooksService';

const customStyles = {
  content : {
    top                   : '50%',
    width                 :'60%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      editedBook: {},
      redirectToBooks: false,
      modalIsOpen: false
    };

    this.addToBasket = this.addToBasket.bind(this);
    this.openEditBookModal = this.openEditBookModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async addToBasket() {
    const item = await BasketService.addBookToBasket(this.state.book);
  }

  openEditBookModal() {
    this.setState({
      modalIsOpen: true,
      editedBook: Object.assign({}, this.state.book)
     });
  }

  onChange(e) {
    this.state.editedBook[e.target.name] = e.target.value;
    this.setState(this.state.editedBook);
  }

  async save() {
    const book = await BooksService.update(this.state.editedBook);
    this.setState({ book });
    this.closeModal();
  }

  async delete() {
    await BooksService.delete(this.state.book.id);
    this.setState({
      redirectToBooks: true
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, editedBook: {} });
  }

  async componentDidMount() {
    // take current from api for now, optimize later
    const { id } = this.props.match.params;
    const book = await BooksService.get(id);
    this.setState({ book });
  }

  render() {
    return (
      <div className="BookDetails">
        <div class="container">
          <h3>Book Details for {(this.state.book || {}).title}</h3>
          <div class="row">
            <div>
              {this.state.redirectToBooks && (<Redirect to="/books" />)}
            </div>
            <div class="col-md-6 offset-md-3">
              <table class="table book-table">
                <tbody>
                <tr>
                    <td>Cover</td>
                    <td>
                      <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394340655i/1931116._SX120_.jpg" />
                    </td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td>{(this.state.book || {}).title}</td>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <td>{(this.state.book || {}).author}</td>
                  </tr>
                  <tr>
                    <td>Publisher</td>
                    <td>{(this.state.book || {}).publisher}</td>
                  </tr>
                  <tr>
                    <td>Pages</td>
                    <td>{(this.state.book || {}).pages}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td>{(this.state.book || {}).quantity}</td>
                  </tr>
                  <tr>
                    <td>Genre</td>
                    <td>{(this.state.book || {}).genre}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Modal isOpen={this.state.modalIsOpen}
                   onRequestClose={this.closeModal}
                   style={customStyles}
                   contentLabel="Book Modal">
              <h2 ref={subtitle => this.subtitle = subtitle}>Add a Book</h2>
              <form className="form-add-book">
                <div className="form-group">
                  <input className="form-control"
                          value={this.state.editedBook.title}
                          onChange={this.onChange}
                          placeholder="Title"
                          name="title" />
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.author}
                         onChange={this.onChange}
                         name="author"
                         placeholder="Author"/>
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.publisher}
                         onChange={this.onChange}
                         name="publisher"
                         placeholder="Publisher"/>
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.quantity}
                         onChange={this.onChange}
                         name="quantity"
                         placeholder="Quantity"/>
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.rating}
                         onChange={this.onChange}
                         name="rating"
                         placeholder="Rating"/>
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.pages}
                         onChange={this.onChange}
                         name="pages"
                         placeholder="Pages"/>
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.price}
                         onChange={this.onChange}
                         name="price"
                         placeholder="Price"/>
                </div>

                <div className="form-group">
                  <input className="form-control"
                         value={this.state.editedBook.genre}
                         onChange={this.onChange}
                         name="genre"
                         placeholder="Genre"/>
                </div>

              </form>
              <div class="details-button-group">
                <button className="btn btn-success" onClick={this.save}>
                  <i class="fa fa-save"></i>&nbsp;
                  Save
                </button>

                <button className="btn btn-info" onClick={this.closeModal}>
                  <i class="fa fa-times"></i>&nbsp;
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
          <div class="details-button-group">
            <button className="btn btn-primary" onClick={this.openEditBookModal}>
              <i class="fa fa-edit"></i>&nbsp;
              Edit
            </button>

            <button className="btn btn-info" onClick={this.addToBasket}>
              <i class="fa fa-shopping-basket"></i>&nbsp;
              Add To Basket
            </button>

            <button className="btn btn-danger" onClick={this.delete}>
              <i class="fa fa-trash"></i>&nbsp;
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetails;