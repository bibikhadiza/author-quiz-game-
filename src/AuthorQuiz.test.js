import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const state = {
  turnData: {
    books: ['The Shining', 'It', 'David Cooperfield', 'A Tale of Two Citites', 'Hamlet'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dickens_Gurney_head.jpg/200px-Dickens_Gurney_head.jpg',
      imageSource: 'Goggle Images',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highLight: 'none'
}

describe("Author Quiz", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => { }} />, div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => { }} highlight={state.highLight}/>);
    })
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })
  })

  describe('When the wrong answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...(Object.assign({}, state, { highlight: 'wrong' }))} onAnswerSelected={() => {}}/>)
    })

    it("should have a red background color", () => {
        expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red')
    });
  });

  describe('When the correct answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...(Object.assign({}, state, { highlight: 'correct' }))} onAnswerSelected={() => { }} />)
    })

    it("should have a red background color", () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green')
    });
  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const onAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />);
        wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", () => {
      expect(onAnswerSelected).toHaveBeenCalled();
    })

    it("selected answer should be the shining", () => {
      expect(onAnswerSelected).toHaveBeenCalledWith("The Shining");
    })

  })

});




