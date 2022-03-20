export function findAncestorWhere(node: any, judge: (n: any) => boolean) {
    let curr = node;
    while (curr && !judge(curr)) {
        curr = curr.parent;
    }
    return curr;
}