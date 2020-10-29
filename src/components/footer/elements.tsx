import styled from 'styled-components';
import { TextareaAutosize as Textarea, Button as MyButton } from '@material-ui/core'

export const FooterWrapper = styled.div`

`;

export const ButtonsWrapper = styled.div`
    width: 100%;
    margin:20px 0;
    display:flex;
    justify-content:flex-start;
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