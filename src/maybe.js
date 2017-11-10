export default function(callback, odds=0.5) {
  if (Math.random() < odds) {
    callback()
  }
}
