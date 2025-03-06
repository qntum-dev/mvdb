import { format } from "date-fns";

export const formatDate = (dateString:string) => {
  return format(new Date(dateString), "MMM dd, yyyy");
};

console.log(formatDate("2023-02-02")); // Output: Feb 02, 2023

export function timeToDuration(runtime:number){

  const hours=Math.round(runtime/60);
  const mins=runtime - (hours * 60);
  console.log(hours);
  console.log(mins);
  if(!(mins>0)){

    return hours+"h";
  }
  return hours+"h" + " " + mins+"m";
  
  
}
