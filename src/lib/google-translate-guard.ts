// Google Translate wraps text nodes in <font> tags, so React later tries to remove or
// insert relative to nodes that are no longer children of the expected parent and throws.
// Make those two DOM calls tolerant so the page keeps working while translated.
// https://github.com/facebook/react/issues/11538
export function installGoogleTranslateGuard() {
  if (typeof window === 'undefined' || typeof Node === 'undefined') return;

  const guarded = window as Window & { __vishTranslateGuard?: boolean };
  if (guarded.__vishTranslateGuard) return;
  guarded.__vishTranslateGuard = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return originalInsertBefore.call(this, newNode, null) as T;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}
