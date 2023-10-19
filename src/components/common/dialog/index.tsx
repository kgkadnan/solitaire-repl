// // import React from 'react';
// // import confirmImage from '@public/assets/icons/confirmation.svg';
// // import Image from 'next/image';
// // import styles from './custom-dialog.module.scss';

// // interface IDialog {
// //   dialogContent: React.ReactNode;
// // }

// // export const CustomDialog: React.FC<IDialog> = ({ dialogContent }) => {
// //   return (
// //     <div className={styles.overlay}>
// //       <div className={styles['dialog-container']}>
// //         <div className={styles['dialog-content']}>{dialogContent}</div>
// //       </div>
// //     </div>
// //   );
// // };

// interface ICustomDialog {
//   text: any;
//   open: any;
//   handleConfirm: any;
// }

// export const CustomDialog: React.FC<ICustomDialog> = ({
//   text,
//   open,
//   handleConfirm,
// }) => {
//   return (
//     <>
//       <div className={open ? `confirm show` : 'confirm'}>
//         <div className="confirm-content">
//           <h4>CONFIRM</h4>
//           <div>
//             <h2>{text}</h2>
//             <p>This action is final...</p>
//           </div>
//         </div>
//         <div className="confirm-btns">
//           <button onClick={() => handleConfirm(true)}>YES</button>
//           <button onClick={() => handleConfirm(false)}>NO</button>
//         </div>
//       </div>
//       <div className="overlay" onClick={() => handleConfirm(false)} />
//     </>
//   );
// };
