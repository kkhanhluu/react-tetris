import { Tile } from 'components/Tile';
import { FunctionComponent } from 'react';
import {
  StyledEM,
  StyledH1,
  StyledP,
  StyledSpanL,
  TopBorder,
  View,
} from './style';

export const Decoration: FunctionComponent = () => {
  return (
    <>
      <TopBorder>
        <StyledSpanL className="mr-10 w-40" />
        <StyledSpanL className="mr-10" />
        <StyledSpanL className="mr-10" />
        <StyledSpanL className="mr-10" />
        <StyledSpanL className="mr-10" />
        <span className="r ml-10 w-40"></span>
        <span className="r ml-10"></span>
        <span className="r ml-10"></span>
        <span className="r ml-10"></span>
        <span className="r ml-10"></span>
      </TopBorder>

      <StyledH1>React Tetris</StyledH1>

      <View className="r">
        <Tile isFilled />
        <div className="clear"></div>
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <StyledP />
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <StyledP />
        {new Array(4).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <StyledP />
        <Tile isFilled />
        <div className="clear"></div>
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <Tile isFilled />
        <StyledP />
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <Tile isFilled />
        <div className="clear"></div>
        <Tile isFilled />
        <StyledP />
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
      </View>

      <View className="l">
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <Tile isFilled />
        <StyledP />
        <Tile isFilled />
        <div className="clear"></div>
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <Tile isFilled />
        <StyledP />
        {new Array(4).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <StyledP />
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <StyledP />
        {new Array(2).fill(null).map((_, index) => (
          <Tile isFilled key={index} />
        ))}
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <div className="clear"></div>
        <StyledEM />
        <Tile isFilled />
        <StyledP />
        <Tile isFilled />
        <div className="clear"></div>
        <Tile isFilled />
        <div className="clear"></div>
        <Tile isFilled />
        <div className="clear"></div>
        <Tile isFilled />
      </View>
    </>
  );
};
