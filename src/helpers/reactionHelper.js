const reactToItem = (
  reactionState,
  userReaction,
  createUserReactionFunction,
  setReactionState
) => {
  if (
    (reactionState.isPositive && !reactionState.isUpvoted) ||
    (!reactionState.isPositive && !reactionState.isDownVoted)
  ) {
    let reactionValue = userReaction ? 2 : 1;
    if (userReaction?.isPositive === reactionState.isPositive) {
      reactionValue = 0;
    }
    if (!reactionState.isPositive) {
      reactionValue *= -1;
    }
    setReactionState({
      value: reactionValue,
      deleted: false
    });
    createUserReactionFunction(
      reactionState,
      () => {},
      () => {
        setReactionState({
          value: 0,
          deleted: false
        });
      }
    );
  } else if (userReaction || reactionState.value !== 0) {
    setReactionState({
      value: userReaction?.isPositive ?? reactionState.isPositive ? -1 : 1,
      deleted: true
    });
    createUserReactionFunction(
      {
        ...reactionState,
        removeReaction: true
      },
      () => {},
      () => {
        setReactionState({
          value: 0,
          deleted: false
        });
      }
    );
  }
};

export { reactToItem };
