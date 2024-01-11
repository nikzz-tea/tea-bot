import CommandProps from './commandProps';

export default interface CommandObject {
  modOnly?: boolean;
  aliases?: string[];
  callback: (props: CommandProps) => unknown;
}
