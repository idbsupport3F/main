@isset($data->faq)
    @php
        $val = $data->faq
    @endphp
    <div class="faq-item">
        @isset($val['icon'])
            <div style="width:16px;" class="faq-icon">
                {!! $val['icon']['source'] !!}
            </div>
        @endisset
        <h3>{!! isset($val['title']) ? $val['title'] : "" !!}</h3>
        @php
            $dom = new DOMDocument;
            $dom->loadHTML($content);
            $nodes=[];
            $bodyNodes = $dom->getElementsByTagName('body');  // returns DOMNodeList object
            foreach($bodyNodes[0]->childNodes as $child)      // assuming 1 <body> node
            {
                if($child->nodeName !== '#text') {
                    $nodes[]=$child->nodeName;
                }
            }
        @endphp
        <div class="faq-content" style="grid-template-rows:repeat({!! count($nodes) !!}, 0fr);">
            {!! $content ?? 'Please feed me InnerBlocks.' !!}
        </div>
        <i class="faq-toggle bi bi-chevron-right"></i>
        </div>
@endisset
