import _ from "../../Reactive";

export default function Menu(){
  return _.menu({ className: "fixed-top"},
    _.button({className: "btn btn-secondaty"})
  )
}