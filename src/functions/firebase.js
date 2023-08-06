import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const user_list = firestore().collection('user_list');
const folder = firestore().collection('folder');

// 회원가입
export const addUser = async (uid, user_name, pinCode) => {
    try {
        await user_list.doc(uid).set({
            uid,
            user_name,
            date_created: moment().unix(),
            folder: [],
            pin_code: pinCode
        })

        return {
            status: true,
        }
    } catch (error) {
        console.error(error, '유저 추가 실패');

        return {
            status: false,
            error_message: error
        }
    }
}

// 유저가 로그인 했을 때 데이터 가져오기
export const getUser = async (uid, setLoading) => {
    try {
        setLoading(true);
        const query = await user_list.where('uid', '==', uid).get();

        const userData = query.docs.map(doc => doc.data());

        return {
            status: true,
            data: userData[0],
        };
    } catch (error) {
        return {
            status: false,
            error_message: error
        }
    } finally {
        setLoading(false);
    }
}

// 폴더 추가
export const createFolderPost = async (uid, data, setLoading) => {
    try {
        setLoading(true);

        const documentRef = user_list.doc(uid);
        const doc = await documentRef.get();
        const targetArray = doc.data()['folder'];

        targetArray.push(data);

        const updatedData = { ['folder']: targetArray };

        await documentRef.update(updatedData);

        return {
            status: true
        }
    } catch (error) {
        return {
            status: false,
            error_message: error
        }
    } finally {
        setLoading(false);
    }
}

// 메모 추가
export const createMemoPost = async (folderId, uid, postData) => {
    try {

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const documentId = doc.id;
                const folderData = doc.data().folder;

                // console.log(folderData);

                const updateFolder = folderData.map(item => {
                    if (item.id === folderId) {
                        console.log(item);

                        return {
                            ...item,
                            content: [...item.content, postData]
                        }
                    }

                    return item;
                })

                user_list.doc(uid).update({
                    folder: updateFolder
                })
            })
        })
    } catch (error) {
        console.error(error, '메모 추가 실패');
    }
}