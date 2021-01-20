import React from 'react';
import { render , fireEvent, waitForElement} from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Enzyme,{mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

const data = {
  data: {
    hits: [
      {
        'title': 'abc', 
        'url':'abc.com',
        'author': 'teena'
      },
      {
        'title': 'xyz', 
        'url':'xyz.com',
        'author': 'amilie'
      },
    ],
  },
}; 

const nextPageData = {
  data: {
    hits: [
      {
        'title': 'def', 
        'url':'def.com',
        'author': 'sheila'
      },
      {
        'title': 'jkl', 
        'url':'jkl.com',
        'author': 'cosi'
      },
    ],
  },
};  

// test('renders learn react link', async() => {
//   const data = {
//     data: {
//       hits: [
//         {
//           'title': 'abc', 
//           'url':'abc.com',
//           'author': 'teena'
//         },
//         {
//           'title': 'xyz', 
//           'url':'xyz.com',
//           'author': 'amilie'
//         },
//       ],
//     },
//   };
//   axios.get.mockResolvedValueOnce({
//     data: data
//   });
//   await act(async() => {
//   const { getByText, getByTestId , getAllByTestId, getByRole } =   render(<App />);
//   const linkElement = getByText('first');
//   expect(linkElement).toBeInTheDocument();
//   fireEvent.click(linkElement);
//   const rowValues = await waitForElement(() =>
//     getAllByTestId("row").map(row => row.textContent)
//   );
//   expect(rowValues).toEqual(["ali", "abu"]);
//   const div = getByRole('table');
//   expect(div).toBeInTheDocument();
//   })
// });

describe('tests for codility app', () => {
    let wrapper;
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('test mount render' , async() => {
   
      const cols = [
        { header: 'ID' },
        { header: 'First Name' },
        { header: 'Last Name' }
      ];

      // mock axios promise
      await act(async () => {
             await axios.get
                .mockImplementationOnce(() => Promise.resolve(data))
                .mockImplementationOnce(() => Promise.resolve(nextPageData));
      wrapper = mount(<App />);
     }); 
    
      wrapper.find('button').at(0).simulate('click');
      //wrapper.update();
      let table = wrapper.find('table');
      expect(table).toHaveLength(1);
      table = wrapper.find('table');
      const thead = table.find('thead');
      const tbody = table.find('tbody');
      const headers = thead.find('th');
      const rows = tbody.find('tr');
      expect(rows).toHaveLength(2);
      expect(tbody).toHaveLength(1);
      expect(thead).toHaveLength(1);
      expect(headers).toHaveLength(3);
      headers.forEach((header,index) => {
       expect(header.text()).toEqual(cols[index].header)
      })
      rows.forEach((row,index) => {
        let cells = row.find('td');
        expect(cells).toHaveLength(3);
        let hits = data.data.hits;
        expect(cells.at(0).text()).toEqual(hits[index].title);
        expect(cells.at(1).text()).toEqual(hits[index].url);
        expect(cells.at(2).text()).toEqual(hits[index].author);
       });
       await act(async () => { await axios.get
        .mockImplementationOnce(() => Promise.resolve(nextPageData));
        wrapper = mount(<App />);
       }); 
       
        wrapper.find('button').at(2).simulate('click');
        table = wrapper.find('table');
        const tbody1 = table.find('tbody');
        const rows1 = tbody1.find('tr');
        rows1.forEach((row,index) => {
        let cells = row.find('td');
        expect(cells).toHaveLength(3);
        let hits = nextPageData.data.hits;
        expect(cells.at(0).text()).toEqual(hits[index].title);
        expect(cells.at(1).text()).toEqual(hits[index].url);
        expect(cells.at(2).text()).toEqual(hits[index].author);
       })
    })
});