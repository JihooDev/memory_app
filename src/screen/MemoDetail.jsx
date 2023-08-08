import React, { useEffect, useRef, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors';
import CustomStatusBar from '../components/CustomStatusBar';
import { useRecoilState } from 'recoil';
import { detailData } from '../recoil/user';
import { styled } from 'styled-components';
import { font, ht, wt } from '../../responsive/responsive';
import { MotiPressable } from 'moti/interactions';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MotiView } from 'moti';

const MemoDetail = ({ route }) => {

    const [folderData, setFolderData] = useRecoilState(detailData);
    const [noteData, setNoteData] = useState(route.params.data);
    const [editName, setEditName] = useState(noteData.name);
    const nameInputRef = useRef();

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                back={true}
                title={folderData.name}
            />
            <KeyboardAwareScrollView>
                <MainView>
                    <CustomInputView>
                        <TextInput
                            value={editName}
                            onChangeText={text => setEditName(text)}
                            style={{
                                color: COLORS.white,
                                fontSize: font(16),
                                fontFamily: "Pretendard-Medium"
                            }}
                            placeholder="메모의 이름을 입력해주세요"
                            placeholderTextColor={COLORS.gray}
                        />
                        <MotiView
                            style={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                height: ht(10),
                            }}
                            animate={{
                                backgroundColor: editName.length > 0 ? COLORS.success : COLORS.gray
                            }}
                        />
                    </CustomInputView>
                </MainView>
            </KeyboardAwareScrollView>
        </CustomSafeAreaView>
    )
}

const MainView = styled.View`
    flex: 1;
    padding: ${ht(50)}px ${wt(80)}px;
`

const CustomInputView = styled.View`
    width: 100%;
    height: ${ht(230)}px;
    margin: ${ht(80)}px 0;
    justify-content: center;
`


export default MemoDetail