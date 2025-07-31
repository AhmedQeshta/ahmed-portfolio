import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import {
  IBlockH1,
  IBlockH2,
  IBlockH3,
  IBlockH4,
  IBlockH5,
  IBlockH6,
  IBlockNormal,
  IBlockQuote,
  ICodeBlock,
  IListBullet,
  IListNumber,
  IMarkCode,
  IMarkEm,
  IMarkLinkProps,
  IMarkStrong,
  IPortableTextComponents,
} from '@/features/shard/types/common';
import PortableImage from '@/features/shard/components/portableText/PortableImage';
import CodeBlock from '@/features/shard/components/portableText/CodeBlock';
import Normal from '@/features/shard/components/portableText/block/Normal';
import Header1 from '@/features/shard/components/portableText/block/Header1';
import Header2 from '@/features/shard/components/portableText/block/Header2';
import Header3 from '@/features/shard/components/portableText/block/Header3';
import Header4 from '@/features/shard/components/portableText/block/Header4';
import Header5 from '@/features/shard/components/portableText/block/Header5';
import Header6 from '@/features/shard/components/portableText/block/Header6';
import Blockquote from '@/features/shard/components/portableText/block/Blockquote';
import BulletList from '@/features/shard/components/portableText/block/BulletList';
import NumberList from '@/features/shard/components/portableText/block/NumberList';
import ListItem from '@/features/shard/components/portableText/block/ListItem';
import Strong from '@/features/shard/components/portableText/block/Strong';
import Link from '@/features/shard/components/portableText/block/Link';
import Code from '@/features/shard/components/portableText/block/Code';
import Em from '@/features/shard/components/portableText/block/Em';

// Shared PortableText components for consistent rich text rendering
export const portableTextComponents = {
  types: {
    image: ({ value }: IPortableTextComponents) => <PortableImage value={value} />,
    codeBlock: ({ value }: ICodeBlock) => <CodeBlock value={value} />,
  },
  block: {
    normal: ({ children }: IBlockNormal) => <Normal>{children}</Normal>,
    h1: ({ children }: IBlockH1) => <Header1>{children}</Header1>,
    h2: ({ children }: IBlockH2) => <Header2>{children}</Header2>,
    h3: ({ children }: IBlockH3) => <Header3>{children}</Header3>,
    h4: ({ children }: IBlockH4) => <Header4>{children}</Header4>,
    h5: ({ children }: IBlockH5) => <Header5>{children}</Header5>,
    h6: ({ children }: IBlockH6) => <Header6>{children}</Header6>,
    blockquote: ({ children }: IBlockQuote) => <Blockquote>{children}</Blockquote>,
  },
  list: {
    bullet: ({ children }: IListBullet) => <BulletList>{children}</BulletList>,
    number: ({ children }: IListNumber) => <NumberList>{children}</NumberList>,
  },
  listItem: {
    bullet: ({ children }: IListBullet) => <ListItem>{children}</ListItem>,
    number: ({ children }: IListNumber) => <ListItem>{children}</ListItem>,
  },
  marks: {
    strong: ({ children }: IMarkStrong) => <Strong>{children}</Strong>,
    em: ({ children }: IMarkEm) => <Em>{children}</Em>,
    code: ({ children }: IMarkCode) => <Code>{children}</Code>,
    link: ({ children, value }: IMarkLinkProps) => <Link value={value}>{children}</Link>,
  },
};
