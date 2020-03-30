import React from 'react'
import { Center } from '../center/center'
import { StyledText } from '../text/text'
import { Row, Flexible } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faTimes, faFileWord, faFileImage, faFilePdf, faFilePowerpoint, faFileExcel, faFileCsv, faFileAudio, faFileVideo, faFileArchive, faFileCode, faFileAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '../button/button'

export interface IFileAttachmentProps {
  canDelete?: boolean;
  padding?: string;
  file: File;
  onDelete?: () => void;
}

const extensionToIcon: {[key: string]: IconDefinition} = {
  gif: faFileImage,
  jpeg: faFileImage,
  jpg: faFileImage,
  png: faFileImage,

  pdf: faFilePdf,

  doc: faFileWord,
  docx: faFileWord,

  ppt: faFilePowerpoint,
  pptx: faFilePowerpoint,

  xls: faFileExcel,
  xlsx: faFileExcel,

  csv: faFileCsv,

  aac: faFileAudio,
  mp3: faFileAudio,
  ogg: faFileAudio,

  avi: faFileVideo,
  flv: faFileVideo,
  mkv: faFileVideo,
  mp4: faFileVideo,

  gz: faFileArchive,
  zip: faFileArchive,

  css: faFileCode,
  html: faFileCode,
  js: faFileCode,

  txt: faFileAlt,
}

const getIcon = (extension: string) => {
  if(extension in extensionToIcon) return extensionToIcon[extension]
  return faFile
}

export const FileAttachment: React.FC<IFileAttachmentProps> = (props) => {
  const paths = props.file.name.split('.')
  const extension = paths[paths.length - 1]

  return (
    <Row mainAxisSize='max' style={{ padding: props.padding ?? '12px' }} crossAxisAlignment='center'>
      <IconButton icon={faTimes} iconSize='sm' size='64px' onTap={props.onDelete} />
      <div style={{
        flexBasis: '48px',
        width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-primary)',
      }}>
        <Center>
          <FontAwesomeIcon icon={getIcon(extension)} size='lg' color='rgba(255, 255, 255, 0.9)' />
        </Center>
      </div>
      <SizedBox flexSize='12px' />
      <Flexible>
        <StyledText fontWeight={500} color='muted'>
          {props.file.name}
        </StyledText>
      </Flexible>
    </Row>

  )
}