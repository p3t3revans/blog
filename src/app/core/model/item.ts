import {Comment} from './comment';
export class Item {
  agendaItem: Number;
  taskNumber:Number;
  task:String;
  startSchedule:Date;
  finishSchedule:Date;
  hourEstElasped:Number
  project: String;
  actionBy: String;
  comments: Comment[];

}