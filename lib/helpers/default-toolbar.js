/** *************************************************************************

This File will be used for Editor Component default toolbar

************************************************************************* **/
const defaultToolbar = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  ['bold', 'italic', 'underline'], // toggled buttons
  [
    { align: '' },
    { align: 'center' },
    { align: 'right' },
    { align: 'justify' },
  ],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ['clean'], // remove formatting button
]
export default defaultToolbar
