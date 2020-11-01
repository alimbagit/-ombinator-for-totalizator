import styled from 'styled-components';
import { TextareaAutosize as Textarea, Button as MyButton } from '@material-ui/core'

export const FooterWrapper = styled.div`
    margin:10px;
    padding:5px;
`;

export const ButtonsWrapper = styled.div`
    width: 100%;
    margin:20px 0;
    display:flex;
    justify-content:space-between;
`;

export const TextareaAutosize = styled(Textarea)`
    width:100%;
`;

export const Button = styled(MyButton)`
    margin:0 10px;
    flex-shrink:1;
`;

export const MenuWrapper = styled.div`
    margin:0 10px;
    flex-shrink:0;
`;